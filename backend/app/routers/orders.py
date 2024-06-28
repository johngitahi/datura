from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from main import get_db, order_repository

router = APIRouter(prefix="/orders")


# this endpoint should be protected for users only
# permision create order
@router.post("")
async def place_new_order(create_order_data: Request, db: Session = Depends(get_db)):
    # unraffle the request body first, i.e. from React frontend

    # {
    # 	"address": 'Wextlive',
    # 	"phoneNumber": '074183813',
    # 	"total": 940,
    # 	"orderData": [
    # 		{
    # 			"menu_id": 4,
    # 			"price": 940,
    # 			"item_name": "LaCoste",
    # 			"hotel_id": 3,
    # 			"quantity": 2
    # 		}
    # 	]
    # }
    received_order_data = (
        await create_order_data.json()
    )  # this is a dictionary with the format above

    order_data = received_order_data["orderData"]

    # <===========================================>
    # OK: this is what i want to do with the data which I have received now.
    # 1. trigger a mpesa stk push with the phone number in the data
    # 2. get the result of the mpesa stk
    # 3. retrieve the MerchantID from the result
    # 4. add the merchant id to the data which is passed to the order repository
    # <===========================================>

    from payments.utils import trigger_stkp_payment

    billing_number = int(order_data["phoneNumber"])
    total_bill = order_data["total"]

    # 1/2. trigger a mpesa stk push & get the response of the trigger
    stk_response = await trigger_stkp_payment(total_bill, billing_number)

    # 3.retrieve the MerchantID from the response
    merchantID = stk_response.get("MerchantRequestID")

    if merchantID is None:
        return {"msg": "Payment was not initiated"}

    order_response = await order_repository.create_new_order(db, order_data, merchantID, str(billing_number))
    return order_response  # i am thinking to not send a order response so that the frontend can no, that if
    # there was a response then it must have not initiated payment, so that the user can know.


# get details for a specific order
# permission: read orders
@router.get("/{order_id:int}")
def get_details_for_specific_order(order_id: int, db: Session = Depends(get_db)):
    details = order_repository.details_of(db, order_id)

    if details is None:
        return {"msg": """The requested order is not present in our database."""}
    return details


@router.get("/ConfirmedOrders")
def get_confirmed_orders(db: Session = Depends(get_db)):
    confirmed_orders = order_repository.retrieve_confirmed_orders(db)

    if confirmed_orders is None:
        return {"msg": "0 confirmed orders"}

     # Create a list to store confirmed orders with their associated order_items
    confirmed_orders_with_items = []

    for confirmed_order in confirmed_orders:
        order_items = confirmed_order.items
        # Convert the order and its associated order_items to a dictionary
        confirmed_order_dict = {
            "order": confirmed_order.__dict__,
            "order_items": [item.__dict__ for item in order_items],
        }


        confirmed_orders_with_items.append(confirmed_order_dict)

    return {"confirmed_orders": confirmed_orders_with_items}

@router.put("/UpdateDeliveryStatus/{order_id}")
def update_order_deliverey_status(order_id, db: Session = Depends(get_db)):
    res = order_repository.update_order_delivery_status(db, order_id)
    return res
