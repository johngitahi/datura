from typing import Any, Dict
import json
from fastapi import APIRouter, HTTPException, Request, Depends
from sqlalchemy.orm import Session as SessionType
from pydantic import BaseModel


from main import get_db, order_repository

router = APIRouter(prefix="/pay")

class MpesaCallbackData(BaseModel):
    Body: dict

@router.post("/callback/")
async def callback(
    data: MpesaCallbackData, db: SessionType = Depends(get_db)
):

    try:
        # Extract the ResultCode and MerchantRequestID
        result_code = data.Body["stkCallback"]["ResultCode"]
        merchant_request_id = data.Body["stkCallback"]["MerchantRequestID"]
        print(data.Body)

        # Use the extracted data in your application logic
        # For example, you can check the ResultCode and process accordingly
        if result_code == 0:
            # The request was successful, perform your processing here
            print(f"Result code {result_code}")

            # operation to update the order as confirmed
            order_id_integer = merchant_request_id

            order_repository.update_order_status(db, order_id_integer)
            return

        else:
            # do not update status of order, just return
            print("failed to update order status")
            return

    except KeyError as e:
        # Handle missing keys or other errors
        raise HTTPException(
            status_code=400, detail=f"Error processing callback: {str(e)}"
        )
