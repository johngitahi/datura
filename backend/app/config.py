from pydantic_settings import BaseSettings

#  where has this helper 'validator' been implemented


class Settings(BaseSettings):
    consumer_key: str
    consumer_secret: str
    mpesa_express_endpoint: str
    mpesa_auth_endpoint: str
    till_number: int
    short_code: int
    passkey: str
    #DATABASE_CONN: str
    BOT_TOKEN: str

    @classmethod
    # @validator("client_origin_url", "auth0_audience", "auth0_domain")
    def check_not_empty(cls, v):
        assert v != "", f"{v} is not defined"
        return v

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
