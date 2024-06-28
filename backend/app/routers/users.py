from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session as SessionType
from main import get_db, user_repository
from domain.models import Users

router = APIRouter(prefix="/users")


# not sure if this is important
# protect this
# permission read users
@router.get("/all")
def get_all_users(db: SessionType = Depends(get_db)):
    return user_repository.list_all_users(db)


# permission read user_profile
@router.get("/{user_id}")
def get_user_profile(user_id: int, db: SessionType = Depends(get_db)):
    user_profile_data = user_repository.details_of(db, user_id)
    return user_profile_data


# permission edit user_profile
@router.put("/{user_id}")
def update_user_profile(user_id: int, db: SessionType = Depends(get_db)):
    # get details that want to be updated

    # TODO: get real detais from React Frontend

    # dummy data to illustrate this
    dummy_user_data: dict = {
        "name": "William Kimani",
        "phone": 254742642823,
        "email": "will@kim.com",
    }

    update_user_profile_res = user_repository.update_user_details(
        db, user_id, dummy_user_data
    )

    if update_user_profile_res == "FAIL":
        return {"msg": "failed updating user data"}

    return update_user_profile_res


# permission read user_address
@router.get("/{user_id}/addresses")
def get_addresses_of_user(user_id: int, db: SessionType = Depends(get_db)):
    user_addresses = user_repository.get_user_addresses(db, user_id)

    return user_addresses


# this method does not work
# will be implemented fully when need arises
@router.post("/{user_id}/addresses")
def add_user_address(user_id: int, db: SessionType = Depends(get_db)):
    # TODO: get the address from the react frontend

    # using dummy data to illustrate this
    dummy_address_data: str = "OBT PP2354"

    user_repository.add_user_address(
        db, user_id, updated_address_data=dummy_address_data
    )


# @router.put("/{user_id}/updateAddress/{addressId}") : don't think this is necessary.
# it is necessary tho and i will implement it. thinking: implement it in the main.py
# file to avoid mixup with the url path used here
