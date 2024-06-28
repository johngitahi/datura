from domain.models import Hotels, Menu
from sqlalchemy.orm import Session

 
class HotelRepository:
    def list_all(self, db: Session):
        return db.query(Hotels).all()

    def details_of(self, db: Session, hotel_id: int):
        return db.query(Hotels).filter(Hotels.hotel_id == hotel_id).first()

    # redundant --> check menu repo
    def get_menu_items(self, db: Session, hotel_id: int):
        return db.query(Menu).filter(Menu.hotel_id == hotel_id).all()

    def add_hotel(self, db: Session, hotel_data):
        new_hotel = Hotels(**hotel_data)
        db.add(new_hotel)
        db.commit()
        db.refresh(new_hotel)
        return new_hotel
