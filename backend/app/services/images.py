from bson import ObjectId
from fastapi import HTTPException, UploadFile

from app.core.database import get_fs


MAX_IMAGE_BYTES = 8 * 1024 * 1024
ALLOWED_MIMES = {"image/jpeg", "image/png", "image/webp", "image/gif"}


async def save_image(file: UploadFile, base_url: str) -> tuple[str, str]:
    """Salva no GridFS e retorna (file_id_str, url_publica)."""
    if file.content_type not in ALLOWED_MIMES:
        raise HTTPException(
            status_code=400,
            detail=f"Tipo de imagem não permitido: {file.content_type}",
        )

    contents = await file.read()
    if len(contents) > MAX_IMAGE_BYTES:
        raise HTTPException(
            status_code=400,
            detail=f"Imagem maior que {MAX_IMAGE_BYTES // (1024 * 1024)}MB",
        )

    fs = get_fs()
    file_id = await fs.upload_from_stream(
        filename=file.filename or "image",
        source=contents,
        metadata={"content_type": file.content_type, "size": len(contents)},
    )

    url = f"{base_url.rstrip('/')}/api/images/{file_id}"
    return str(file_id), url


async def get_image_bytes(file_id: str) -> tuple[bytes, str]:
    try:
        oid = ObjectId(file_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Imagem não encontrada")

    fs = get_fs()
    try:
        stream = await fs.open_download_stream(oid)
        data = await stream.read()
        content_type = stream.metadata.get(
            "content_type", "application/octet-stream"
        )
        return data, content_type
    except Exception:
        raise HTTPException(status_code=404, detail="Imagem não encontrada")


async def delete_image(file_id: str) -> None:
    try:
        oid = ObjectId(file_id)
        fs = get_fs()
        await fs.delete(oid)
    except Exception:
        pass