from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware

from app.api import admin as admin_routes
from app.api import routes as public_routes
from app.api.admin import NotAuthenticated
from app.core.config import settings
from app.core.database import (
    close_mongo_connection,
    connect_to_mongo,
    get_database,
)

BASE_DIR = Path(__file__).resolve().parent
TEMPLATES_DIR = BASE_DIR / "templates"
STATIC_DIR = BASE_DIR / "static"


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()


app = FastAPI(
    title="Pedra Lunar — 3D Lab API",
    version="0.2.0",
    lifespan=lifespan,
)

app.add_middleware(
    SessionMiddleware,
    secret_key=settings.secret_key,
    max_age=60 * 60 * 8,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory=str(TEMPLATES_DIR))
app.mount(
    "/admin/static",
    StaticFiles(directory=str(STATIC_DIR)),
    name="admin-static",
)

app.include_router(public_routes.router)
app.include_router(admin_routes.router)


@app.exception_handler(NotAuthenticated)
async def not_authenticated_handler(request: Request, exc: NotAuthenticated):
    return RedirectResponse(url="/admin/login", status_code=303)


@app.get("/admin/login", response_class=HTMLResponse)
async def admin_login_page(request: Request):
    if request.session.get("authenticated"):
        return RedirectResponse("/admin/", status_code=303)
    return templates.TemplateResponse("login.html", {"request": request})


@app.get("/admin/", response_class=HTMLResponse)
async def admin_dashboard(request: Request):
    if not request.session.get("authenticated"):
        return RedirectResponse("/admin/login", status_code=303)
    return templates.TemplateResponse(
        "dashboard.html",
        {
            "request": request,
            "site_url": settings.frontend_origin,
        },
    )


@app.get("/admin/depoimentos", response_class=HTMLResponse)
async def admin_testimonials(request: Request):
    if not request.session.get("authenticated"):
        return RedirectResponse("/admin/login", status_code=303)
    return templates.TemplateResponse(
        "testimonials.html",
        {
            "request": request,
            "site_url": settings.frontend_origin,
        },
    )


@app.get("/admin", include_in_schema=False)
async def admin_root_redirect():
    return RedirectResponse("/admin/", status_code=307)


@app.get("/api/health")
async def health():
    db = get_database()
    try:
        await db.command("ping")
        db_status = "connected"
    except Exception:
        db_status = "error"

    return {
        "status": "ok",
        "service": "pedra-lunar-api",
        "version": "0.2.0",
        "database": db_status,
    }