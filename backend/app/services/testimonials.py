import secrets
from datetime import datetime, timezone

from fastapi import HTTPException

from app.core.database import get_database
from app.schemas.testimonial import Testimonial

COLLECTION = "testimonials"


def _to_public(doc: dict) -> dict:
    doc = dict(doc)
    doc.pop("_id", None)
    doc.pop("createdAt", None)
    return doc


def _clean(payload: dict) -> dict:
    """Normaliza os campos: strip, rating entre 1 e 5, EN vazio → None."""
    rating = int(payload.get("rating") or 5)
    return {
        "quote": payload["quote"].strip(),
        "author": payload["author"].strip(),
        "role": payload["role"].strip(),
        "rating": max(1, min(5, rating)),
        "quote_en": (payload.get("quote_en") or "").strip() or None,
        "role_en": (payload.get("role_en") or "").strip() or None,
    }


async def list_testimonials() -> list[Testimonial]:
    db = get_database()
    cursor = db[COLLECTION].find({}).sort("createdAt", -1)
    docs = await cursor.to_list(length=200)
    return [Testimonial(**_to_public(d)) for d in docs]


async def create_testimonial(payload: dict) -> Testimonial:
    db = get_database()
    doc = {
        "id": secrets.token_hex(6),
        **_clean(payload),
        "createdAt": datetime.now(timezone.utc),
    }
    await db[COLLECTION].insert_one(doc)
    return Testimonial(**_to_public(doc))


async def update_testimonial(testimonial_id: str, payload: dict) -> Testimonial:
    db = get_database()
    result = await db[COLLECTION].find_one_and_update(
        {"id": testimonial_id},
        {"$set": _clean(payload)},
        return_document=True,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Depoimento não encontrado")
    return Testimonial(**_to_public(result))


async def delete_testimonial(testimonial_id: str) -> None:
    db = get_database()
    doc = await db[COLLECTION].find_one_and_delete({"id": testimonial_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Depoimento não encontrado")
