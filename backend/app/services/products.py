import re
import unicodedata
from datetime import datetime, timezone

from fastapi import HTTPException

from app.core.database import get_database
from app.schemas.product import Product


def _slugify(text: str) -> str:
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text or "produto"


async def _unique_slug(base: str) -> str:
    db = get_database()
    slug = base
    n = 2
    while await db["products"].find_one({"id": slug}) is not None:
        slug = f"{base}-{n}"
        n += 1
    return slug


def _to_public(doc: dict) -> dict:
    doc = dict(doc)
    doc.pop("_id", None)
    doc.pop("createdAt", None)
    return doc


def _extract_en(payload: dict) -> dict:
    """Normaliza os campos EN: string vazia → None."""
    return {
        "name_en": (payload.get("name_en") or "").strip() or None,
        "shortDescription_en": (payload.get("shortDescription_en") or "").strip() or None,
        "longDescription_en": (payload.get("longDescription_en") or "").strip() or None,
        "features_en": payload.get("features_en") or None,
        "badge_en": (payload.get("badge_en") or "").strip() or None,
    }


async def list_products() -> list[Product]:
    db = get_database()
    cursor = db["products"].find({}).sort("createdAt", -1)
    docs = await cursor.to_list(length=1000)
    return [Product(**_to_public(d)) for d in docs]


async def get_product(product_id: str) -> Product:
    db = get_database()
    doc = await db["products"].find_one({"id": product_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return Product(**_to_public(doc))


async def create_product(payload: dict) -> Product:
    db = get_database()

    product_id = await _unique_slug(_slugify(payload["name"]))
    en = _extract_en(payload)

    doc = {
        "id": product_id,
        "name": payload["name"],
        "category": payload["category"],
        "shortDescription": payload["shortDescription"],
        "longDescription": payload.get("longDescription") or None,
        "features": payload.get("features") or None,
        "price": float(payload["price"]),
        "badge": payload.get("badge") or None,
        "accent": payload.get("accent") or "rgba(180, 190, 220, 0.22)",
        "leadTimeDays": int(payload["leadTimeDays"]),
        "image": payload.get("image"),
        "images": payload.get("images") or None,
        **en,
        "createdAt": datetime.now(timezone.utc),
    }

    await db["products"].insert_one(doc)
    return Product(**_to_public(doc))


async def update_product(product_id: str, payload: dict) -> Product:
    db = get_database()
    existing = await db["products"].find_one({"id": product_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    en = _extract_en(payload)

    update = {
        "name": payload["name"],
        "category": payload["category"],
        "shortDescription": payload["shortDescription"],
        "longDescription": payload.get("longDescription") or None,
        "features": payload.get("features") or None,
        "price": float(payload["price"]),
        "badge": payload.get("badge") or None,
        "accent": payload.get("accent")
        or existing.get("accent", "rgba(180, 190, 220, 0.22)"),
        "leadTimeDays": int(payload["leadTimeDays"]),
        "image": payload.get("image"),
        "images": payload.get("images") or None,
        **en,
    }

    await db["products"].update_one({"id": product_id}, {"$set": update})
    updated = await db["products"].find_one({"id": product_id})
    return Product(**_to_public(updated))


async def delete_product(product_id: str) -> Product:
    db = get_database()
    doc = await db["products"].find_one_and_delete({"id": product_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return Product(**_to_public(doc))