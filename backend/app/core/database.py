from motor.motor_asyncio import (
    AsyncIOMotorClient,
    AsyncIOMotorDatabase,
    AsyncIOMotorGridFSBucket,
)

from app.core.config import settings


class Database:
    client: AsyncIOMotorClient | None = None
    db: AsyncIOMotorDatabase | None = None
    fs: AsyncIOMotorGridFSBucket | None = None


database = Database()


async def connect_to_mongo() -> None:
    database.client = AsyncIOMotorClient(settings.mongo_uri)
    database.db = database.client[settings.mongo_db_name]
    await database.client.admin.command("ping")
    database.fs = AsyncIOMotorGridFSBucket(database.db, bucket_name="images")


async def close_mongo_connection() -> None:
    if database.client is not None:
        database.client.close()
        database.client = None
        database.db = None
        database.fs = None


def get_database() -> AsyncIOMotorDatabase:
    if database.db is None:
        raise RuntimeError("Banco de dados não inicializado")
    return database.db


def get_fs() -> AsyncIOMotorGridFSBucket:
    if database.fs is None:
        raise RuntimeError("GridFS não inicializado")
    return database.fs