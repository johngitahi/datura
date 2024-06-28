from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from database import Base

"""THINK: USE auth0 to handle users, im stuck. anxiety is the dizziness of choice"""


class Users(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    phone = Column(String(20), nullable=False)
    addresses = relationship("Address", back_populates="user")
    # orders = relationship("Orders", back_populates="user")
    ratings = relationship("Rating", back_populates="user")


class Hotels(Base):
    __tablename__ = "hotels"
    hotel_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    logo_url = Column(String, nullable=False)
    menu_items = relationship("Menu", back_populates="hotel")
    orders = relationship("OrderItem", back_populates="hotel")
    ratings = relationship("Rating", back_populates="hotel")


class Orders(Base):
    __tablename__ = "orders"
    """
    python is screaming/warning me that this order_id attribute should have
    a generator (i dont think i should have one)
    i have added a nullable param to see if it keeps shut
    
    for test populating the db using the populate_db.py script, add these
    props: autoincrement=True, and change the type to String.(wtf was i thinking here)

    ## hehe, that will cause a sqlalchemy Integrity Error later. That was so dumb!
    ## Do not change the types once the db has already been called. I wonder how 
    ## many hours I would have wasted trying to debug this stupid mistake.
    
    after running the script, replace them back again to what you found here
    """

    # this will use the mpesa MerchantReqestID retrieved as the order_id to
    # streamline updating order status
    order_id = Column(String, primary_key=True, nullable=False)
    # user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False) -> will have to activate this if users want orders to e linked to them
    # unnecessary to have hotel_id here as a FK cause the order is now a bag that holds individual order items
    order_total = Column(Integer, nullable=False)
    delivery_location = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    order_status = Column(String, nullable=False)
    delivery_status = Column(String(20), nullable=False)
    # user = relationship("Users", back_populates="orders")
    payment = relationship("Payment", back_populates="order")
    items = relationship("OrderItem", back_populates="order")  # new r/ship

    """ **Explanation for the new relationship**
    My thinking is that an order can have multiple order items from various hotels,
    so an Order is like the bag which holds different OrderItems(like now the food being ordered as 
    a single entity)

    I have modelled the OrderItem below
    """


class OrderItem(Base):
    __tablename__ = "order_items"
    order_item_id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(String, ForeignKey("orders.order_id"), nullable=False)
    hotel_id = Column(Integer, ForeignKey("hotels.hotel_id"), nullable=False)
    item_name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Integer, nullable=False)
    hotel = relationship("Hotels", back_populates="orders")
    order = relationship("Orders", back_populates="items")


# won't be needing this domain model for some time
class Drivers(Base):
    __tablename__ = "drivers"
    driver_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    location = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)


"""I will simply not save payment records for test cohort 1"""


class Payment(Base):
    __tablename__ = "payment"
    payment_id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(String, ForeignKey("orders.order_id"), nullable=False)
    # payment_method = Column(String(20), nullable=False) mpesa default, think of partial cod
    amount = Column(Integer, nullable=False)
    status = Column(String(20), nullable=False)
    order = relationship("Orders", back_populates="payment")


class Rating(Base):
    __tablename__ = "rating"
    rating_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    hotel_id = Column(Integer, ForeignKey("hotels.hotel_id"), nullable=False)
    rating = Column(Integer, nullable=False)
    user = relationship("Users", back_populates="ratings")
    hotel = relationship("Hotels", back_populates="ratings")


# for logged in users, who wanna save their addresses and orders
# this app brings food to you wherever you are(if not logged in, you need
# to keep on stating the location for delivery), but you can also save addresses
class Address(Base):
    __tablename__ = "address"
    address_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    # removed because mvp operations happen in Nakuru kaba, so only street is necessary
    # city = Column(String(255), nullable=False)
    street = Column(String(255), nullable=False)
    # thinking of creating a picode table for every area near kabarak univ
    pincode = Column(Integer, nullable=False)
    user = relationship("Users", back_populates="addresses")


class Menu(Base):
    __tablename__ = "menu"
    menu_id = Column(Integer, primary_key=True, autoincrement=True)
    hotel_id = Column(Integer, ForeignKey("hotels.hotel_id"), nullable=False)
    item_name = Column(String(255), nullable=False)
    price = Column(Integer, nullable=False)
    # image_url = Column(String(255), nullable=False)  # set a image url for the menu item
    hotel = relationship("Hotels", back_populates="menu_items")
