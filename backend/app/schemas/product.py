from typing import Literal, Optional

from pydantic import BaseModel

Category = Literal["decoracao", "utilidades", "personalizados", "prototipos"]


class Product(BaseModel):
    """Modelo público do produto (como o frontend consome)."""

    id: str
    name: str
    category: Category
    shortDescription: str
    longDescription: Optional[str] = None
    features: Optional[list[str]] = None
    price: float
    badge: Optional[str] = None
    accent: str = "rgba(180, 190, 220, 0.22)"
    leadTimeDays: int
    image: Optional[str] = None
    images: Optional[list[str]] = None

    # Tradução em inglês (opcional — preenchido manualmente ou via API)
    name_en: Optional[str] = None
    shortDescription_en: Optional[str] = None
    longDescription_en: Optional[str] = None
    features_en: Optional[list[str]] = None
    badge_en: Optional[str] = None