# Contact    : gitahi109@gmail.com

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from repositories import menu_repo, hotel_repo, order_repo, user_repo
from database import SessionLocal, engine
from domain import models
from config import settings

# create the database tables
models.Base.metadata.create_all(bind=engine)

# database session retrieval dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

### SETUP CORS

origins = [
    "https://ziptdeliveries.com",  # frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# set dependencies
menu_repository = menu_repo.MenuRepository()
hotel_repository = hotel_repo.HotelRepository()
order_repository = order_repo.OrderRepository()
user_repository = user_repo.UserRepository()


# wire the routers to the main application
from routers import hotels, orders, users, payments

app.include_router(hotels.router)
app.include_router(orders.router)
app.include_router(users.router)
app.include_router(payments.router)

""" other endpoints to implement 

5. Address Management: (not done, will be impl in this file)
    PUT /addresses/{address_id}: Update an existing user address.
    DELETE /addresses/{address_id}: Delete a user address.

P.S. my thinking right now for the ability for a user to have multiple addresses is
     so that the user can order food from anywhere they are. also i am thinking to 
     have us(the company) describe areas around kabarak university using pinpoints.
     see more about this in the IDEAS file


"""
