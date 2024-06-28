from sqlalchemy.orm import Session
from domain.models import Menu
from fastapi import HTTPException


class MenuRepository:
    def get_menu_items_by_hotel(self, hotel_id: int, db: Session):
        return db.query(Menu).filter(Menu.hotel_id == hotel_id).all()

    def get_menu_item_by_id(self, menu_item_id: int, db: Session):
        return db.query(Menu).filter(Menu.menu_id == menu_item_id).first()

    # admin use cases/methods from here
    def create_menu_item(self, menu_item_data, db: Session):
        menu_item = Menu(**menu_item_data)
        db.add(menu_item)
        db.commit()
        db.refresh(menu_item)
        return menu_item

    """
    def update_menu_item(self, menu_item: MenuItem):
        existing_item = self.get_menu_item_by_id(menu_item.id)
        if existing_item:
            for attr in menu_item.__dict__:
                setattr(existing_item, attr, getattr(menu_item, attr))
            self.db.commit()
            self.db.refresh(existing_item)
            return existing_item
        return None
    """

    def delete_menu_item(self, menu_item_id: int, db: Session):
        menu_item = db.query(Menu).filter(Menu.menu_id == menu_item_id).first()

        if menu_item is None:
            raise HTTPException(status_code=404, detail="Menu item not found")
    
        db.delete(menu_item)
        db.commit()

        return {
            "msg": f"Menu {menu_item_id} removed from database successfully"
        }
