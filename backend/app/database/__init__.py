from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings

#SQLALCHEMY_DATABASE_URI = "sqlite:////database/database.db" # for development purposes. this db is however empty last i checked

SQLALCHEMY_DATABASE_URI = settings.DATABASE_CONN

engine = create_engine(
        SQLALCHEMY_DATABASE_URI
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

