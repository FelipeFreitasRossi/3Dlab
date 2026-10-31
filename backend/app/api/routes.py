from fastapi import APIRouter, Response

from app.schemas.product import Product
from app.schemas.testimonial import Testimonial
from app.services import images as images_service
from app.services import products as products_service
from app.services import testimonials as testimonials_service

router = APIRouter(prefix="/api")


@router.get("/products", response_model=list[Product])
async def list_products():
    return await products_service.list_products()


@router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    return await products_service.get_product(product_id)


@router.get("/testimonials", response_model=list[Testimonial])
async def list_testimonials():
    return await testimonials_service.list_testimonials()


@router.get("/images/{file_id}")
async def get_image(file_id: str):
    data, content_type = await images_service.get_image_bytes(file_id)
    return Response(
        content=data,
        media_type=content_type,
        headers={"Cache-Control": "public, max-age=31536000, immutable"},
    )
