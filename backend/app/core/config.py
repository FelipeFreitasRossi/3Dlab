from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    mongo_uri: str
    mongo_db_name: str = "pedra_lunar_db"
    frontend_origin: str = "http://localhost:5173"

    admin_password: str
    secret_key: str


settings = Settings()