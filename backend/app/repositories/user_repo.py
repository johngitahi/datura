from sqlalchemy.orm import Session as SessionType
from domain.models import Users, Address

class UserRepository:

	def list_all_users(self, db: SessionType):
		return db.query(Users).all()

	def details_of(self, db: SessionType, user_id: int):
		return db.query(Users).get(user_id)

	def update_user_details(self, db: SessionType, user_id: int, updated_user_data: any):
		user = db.query(Users).get(user_id)

		# TODO: Check if the updated data conflicts with the DATABASE integrity
		if user:
			for key, value in updated_user_data.items():
				setattr(user, key, value)

			db.commit()
			db.refresh(user)
			
			return db.query(Users).get(user_id)
		return "FAIL"

	def get_user_addresses(self, db: SessionType, user_id: int):
		user = db.query(Users).get(user_id)

		if user is None:
			return {"msg": "User does not exist"}

		return user.addresses

	def add_user_address(self, db: SessionType, user_id: int):
		pass

		# to be implemented later. i am done for today. mind is spinning fast
		# damn. this has been work written on Aug 18, 2023
