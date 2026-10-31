from typing import Optional

from pydantic import BaseModel


class Testimonial(BaseModel):
    """Modelo público do depoimento (como o frontend consome)."""

    id: str
    quote: str
    author: str
    role: str
    rating: int = 5

    # Tradução em inglês (opcional)
    quote_en: Optional[str] = None
    role_en: Optional[str] = None
