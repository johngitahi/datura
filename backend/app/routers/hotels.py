from fastapi import APIRouter, Depends, Request, File, Form, UploadFile
from sqlalchemy.orm import Session
from main import get_db, hotel_repository, menu_repository
from typing import Annotated
import boto3
from botocore.exceptions import NoCredentialsError

router = APIRouter(prefix="/hotels")


@router.get("")
def get_list_of_all_hotels(db: Session = Depends(get_db)):
    list_of_hotels = hotel_repository.list_all(db)
    return list_of_hotels
 

@router.get("/{hotel_id}")
def get_details_for_specific_hotel(hotel_id: int, db: Session = Depends(get_db)):
    hotel_details = hotel_repository.details_of(db, hotel_id)
    return hotel_details


@router.get("/{hotel_id}/menu")
def view_menu(hotel_id: int, db: Session = Depends(get_db)):
    menu_items = hotel_repository.get_menu_items(db, hotel_id)
    return menu_items


# accessed from another different microservice
# TODO: Consider securing this endpoint, so that only authorized personnel can access it.
# @router.post("")
# async def add_hotel(req: Request, db: Session = Depends(get_db)):
#     req_data = await req.json()
#     res = hotel_repository.add_hotel(db, req_data)
#     return res


#utility function
# Function to upload file to AWS S3
def upload_to_aws(file, bucket_name, s3_file_name):
    s3 = boto3.client('s3')

    try:
        s3.upload_fileobj(file.file, bucket_name, s3_file_name)
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False

@router.post("")
async def add_hotel(
    name: Annotated[str, Form()],
    location: Annotated[str, Form()],
    phone: Annotated[str, Form()],
    image: Annotated[UploadFile, File()],
    db: Session = Depends(get_db)
):
    try:
        # Upload image to AWS S3
        image_uploaded = upload_to_aws(image, "zipt", image.filename)

        # If image upload successful, proceed to add hotel to database
        if image_uploaded:
            # Construct the image URL using the S3 bucket URL and file name
            logo_url = f"https://zipt.s3.amazonaws.com/{image.filename}"
            
            # Add hotel to the database with the image URL
            hotel_data = {
                "name": name,
                "location": location,
                "phone": phone,
                "logo_url": logo_url
            }
            res = hotel_repository.add_hotel(db, hotel_data)
            return res
        else:
            return {"error": "Failed to upload image to S3"}
    except Exception as e:
        return {"error": str(e)}


# accessed from another different microservice
# TODO: Consider securing this endpoint, so that only authorized personnel can access it.
@router.post("/menu")
async def add_hotel_menu(req: Request, db: Session = Depends(get_db)):
    req_data = await req.json()
    res = menu_repository.create_menu_item(req_data, db)
    return res

@router.delete("/menu/{menu_id}")
async def delete_menu_item(menu_id: int, db: Session = Depends(get_db)):
    res = menu_repository.delete_menu_item(menu_id, db)
    return res
