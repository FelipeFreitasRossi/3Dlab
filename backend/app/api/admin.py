import json
import secrets
from typing import Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, Request, UploadFile

from app.core.config import settings
from app.services import images as images_service
from app.services import products as products_service
from app.services import testimonials as testimonials_service

router = APIRouter(prefix="/admin/api", tags=["admin"])


class NotAuthenticated(Exception):
    pass


def require_admin(request: Request) -> None:
    if not request.session.get("authenticated"):
        raise NotAuthenticated()


@router.post("/login")
async def login(request: Request, password: str = Form(...)):
    if not secrets.compare_digest(password, settings.admin_password):
        raise HTTPException(status_code=401, detail="Senha incorreta")
    request.session["authenticated"] = True
    return {"ok": True}


@router.post("/logout")
async def logout(request: Request):
    request.session.clear()
    return {"ok": True}


@router.get("/me")
async def me(request: Request, _: None = Depends(require_admin)):
    return {"authenticated": True}


def _parse_features(raw: str) -> list[str]:
    return [f.strip() for f in raw.splitlines() if f.strip()]


@router.post("/products")
async def create_product(
    request: Request,
    name: str = Form(...),
    category: str = Form(...),
    shortDescription: str = Form(...),
    longDescription: str = Form(""),
    features: str = Form(""),
    price: float = Form(...),
    badge: str = Form(""),
    leadTimeDays: int = Form(...),
    accent: str = Form("rgba(180, 190, 220, 0.22)"),
    name_en: str = Form(""),
    shortDescription_en: str = Form(""),
    longDescription_en: str = Form(""),
    features_en: str = Form(""),
    badge_en: str = Form(""),
    images: Optional[list[UploadFile]] = File(None),
    _: None = Depends(require_admin),
):
    base_url = str(request.base_url)

    uploaded_urls: list[str] = []
    for file in images or []:
        if not file.filename:
            continue
        _, url = await images_service.save_image(file, base_url)
        uploaded_urls.append(url)

    product = await products_service.create_product(
        {
            "name": name.strip(),
            "category": category,
            "shortDescription": shortDescription.strip(),
            "longDescription": longDescription.strip() or None,
            "features": _parse_features(features),
            "price": price,
            "badge": badge.strip() or None,
            "leadTimeDays": leadTimeDays,
            "accent": accent,
            "image": uploaded_urls[0] if uploaded_urls else None,
            "images": uploaded_urls or None,
            "name_en": name_en.strip() or None,
            "shortDescription_en": shortDescription_en.strip() or None,
            "longDescription_en": longDescription_en.strip() or None,
            "features_en": _parse_features(features_en),
            "badge_en": badge_en.strip() or None,
        }
    )
    return product


@router.put("/products/{product_id}")
async def update_product(
    request: Request,
    product_id: str,
    name: str = Form(...),
    category: str = Form(...),
    shortDescription: str = Form(...),
    longDescription: str = Form(""),
    features: str = Form(""),
    price: float = Form(...),
    badge: str = Form(""),
    leadTimeDays: int = Form(...),
    accent: str = Form("rgba(180, 190, 220, 0.22)"),
    kept_images: str = Form("[]"),
    name_en: str = Form(""),
    shortDescription_en: str = Form(""),
    longDescription_en: str = Form(""),
    features_en: str = Form(""),
    badge_en: str = Form(""),
    images: Optional[list[UploadFile]] = File(None),
    _: None = Depends(require_admin),
):
    base_url = str(request.base_url)

    try:
        keep_urls: list[str] = json.loads(kept_images) if kept_images else []
        if not isinstance(keep_urls, list):
            keep_urls = []
    except json.JSONDecodeError:
        keep_urls = []

    new_urls: list[str] = []
    for file in images or []:
        if not file.filename:
            continue
        _, url = await images_service.save_image(file, base_url)
        new_urls.append(url)

    final_images = keep_urls + new_urls
    old = await products_service.get_product(product_id)

    updated = await products_service.update_product(
        product_id,
        {
            "name": name.strip(),
            "category": category,
            "shortDescription": shortDescription.strip(),
            "longDescription": longDescription.strip() or None,
            "features": _parse_features(features),
            "price": price,
            "badge": badge.strip() or None,
            "leadTimeDays": leadTimeDays,
            "accent": accent,
            "image": final_images[0] if final_images else None,
            "images": final_images or None,
            "name_en": name_en.strip() or None,
            "shortDescription_en": shortDescription_en.strip() or None,
            "longDescription_en": longDescription_en.strip() or None,
            "features_en": _parse_features(features_en),
            "badge_en": badge_en.strip() or None,
        }
    )

    if old.images:
        for old_url in old.images:
            if old_url not in final_images:
                file_id = old_url.rsplit("/", 1)[-1] if "/" in old_url else None
                if file_id:
                    await images_service.delete_image(file_id)

    return updated


@router.delete("/products/{product_id}")
async def delete_product(
    product_id: str,
    _: None = Depends(require_admin),
):
    product = await products_service.delete_product(product_id)
    for url in product.images or []:
        file_id = url.rsplit("/", 1)[-1] if "/" in url else None
        if file_id:
            await images_service.delete_image(file_id)
    return {"ok": True, "deleted": product.id}


# ============================================================
# DEPOIMENTOS (carrossel "O que dizem sobre a Pedra Lunar")
# ============================================================
def _testimonial_payload(
    quote: str,
    author: str,
    role: str,
    rating: int,
    quote_en: str,
    role_en: str,
) -> dict:
    if not quote.strip() or not author.strip() or not role.strip():
        raise HTTPException(status_code=422, detail="Preencha depoimento, nome e descrição")
    return {
        "quote": quote,
        "author": author,
        "role": role,
        "rating": rating,
        "quote_en": quote_en,
        "role_en": role_en,
    }


@router.post("/testimonials")
async def create_testimonial(
    quote: str = Form(..., max_length=500),
    author: str = Form(..., max_length=80),
    role: str = Form(..., max_length=80),
    rating: int = Form(5),
    quote_en: str = Form("", max_length=500),
    role_en: str = Form("", max_length=80),
    _: None = Depends(require_admin),
):
    payload = _testimonial_payload(quote, author, role, rating, quote_en, role_en)
    return await testimonials_service.create_testimonial(payload)


@router.put("/testimonials/{testimonial_id}")
async def update_testimonial(
    testimonial_id: str,
    quote: str = Form(..., max_length=500),
    author: str = Form(..., max_length=80),
    role: str = Form(..., max_length=80),
    rating: int = Form(5),
    quote_en: str = Form("", max_length=500),
    role_en: str = Form("", max_length=80),
    _: None = Depends(require_admin),
):
    payload = _testimonial_payload(quote, author, role, rating, quote_en, role_en)
    return await testimonials_service.update_testimonial(testimonial_id, payload)


@router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(
    testimonial_id: str,
    _: None = Depends(require_admin),
):
    await testimonials_service.delete_testimonial(testimonial_id)
    return {"ok": True, "deleted": testimonial_id}
