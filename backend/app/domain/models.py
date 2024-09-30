from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base

"""THINK: USE auth0 to handle users, im stuck. anxiety is the dizziness of choice"""
class Hotels(Base):
    __tablename__ = "hotels"
    hotel_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    logo_url = Column(String, nullable=False)
    menu_items = relationship("Menu", back_populates="hotel")
    orders = relationship("OrderItem", back_populates="hotel")

class Orders(Base):
    __tablename__ = "orders"

    # this will use the mpesa MerchantReqestID retrieved as the order_id to
    # simplify updating an order status
    order_id = Column(String, primary_key=True, nullable=False)
    order_total = Column(Integer, nullable=False)
    delivery_location = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    order_status = Column(String, nullable=False)
    delivery_status = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    delivered_at = Column(DateTime, nullable=True)
    items = relationship("OrderItem", back_populates="order")

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

class Menu(Base):
    __tablename__ = "menu"
    menu_id = Column(Integer, primary_key=True, autoincrement=True)
    hotel_id = Column(Integer, ForeignKey("hotels.hotel_id"), nullable=False)
    item_name = Column(String(255), nullable=False)
    price = Column(Integer, nullable=False)
    image_url = Column(String(255), nullable=True)
    hotel = relationship("Hotels", back_populates="menu_items")
