from sqlalchemy.orm import Session as SessionType
from config import settings
from domain.models import Orders, OrderItem
import telegram
from telegram.constants import ParseMode


class OrderRepository:
    # method to send a telegram notification message to chat
    async def send_telegram_message(self, chat_id, message):
        bot = telegram.Bot(token=settings.BOT_TOKEN)
        await bot.send_message(
            chat_id=chat_id, text=message, parse_mode=ParseMode.MARKDOWN_V2
        )

    async def create_new_order(
        self, db: SessionType, new_order_data, merchantID: str, billing_number: str
    ):
        """logic
        Create a new Order with the unique M-Pesa MerchantID and 'pending status'. I am using the MerchantID
        so that i can link it to each individual OrderItem. Why do that? First the Merchant ID is always
        unique and is also returned to the callback function on our API. So, this way, once the payment is
        actually confirmed, we can mark the order as confirmed.
        """

        # # perform ops to get merchant id to use as order id
        # merchant_id_integer_unsliced = str(int(merchantID.replace("-", "")))
        # merchant_id_integer = int(merchant_id_integer_unsliced[0:6])

        new_order = Orders(
            # order_id=merchant_id_integer,
            order_id=merchantID,  # replacing with this as the thing is now a string
            # user_id=merchant_id_integer,
            order_total=new_order_data["total"],
            customer_phone=billing_number,
            delivery_location=new_order_data["address"],
            delivery_status="Null",
            order_status="Pending",
        )

        db.add(new_order)
        db.commit()

        # retrieve the list of order items
        list_of_order_items = new_order_data["order_data"]

        # loop over the list of each order item and create a corresponding OrderItem
        # which is linked to the Order via the order_id(ForeignKey to the Order) which is the
        # M-Pesa Merchant ID
        for item in list_of_order_items:
            new_order_item = OrderItem(
                order_id=merchantID,
                hotel_id=item["hotel_id"],
                item_name=item["item_name"],
                quantity=item["quantity"],
                price=item["price"],
            )
            db.add(new_order_item)
            db.commit()

        # Sanity checks to ensure the order is created and return a response
        if (
            db.query(Orders).get(new_order.order_id)
        ) is None:  # actually checking if the order has been created
            return {"msg": "Order not created"}

        hotel_map = {
            1: "Kwa Festo",
            2: "Luminex Restaurant",
            3: "Savor Cafe",
            4: "Lexys Restaurant",
            5: "Kiqwetu Baraks Hotel",
        }

        message = (
            f"New order: `{merchantID}`\n"
            f"Confirm here: https://t\.ly/ey43z\n"
            f"Delivery Location: {new_order_data['address']}\n"
            f"Total Amount: {new_order_data['total']} KES\n"
            f"Phone Number: \+{billing_number}\n\n"
            "Order Details:\n"
        )

        for item in new_order_data['order_data']:
            hotel_id = item['hotel_id']
            hotel_name = hotel_map.get(hotel_id, "unknown")

            item_message = (
                f"\- {item['quantity']} x {item['item_name']} from {hotel_name}\n"
            )
            message += item_message

        # send a message to the channel with the new order details
        await self.send_telegram_message(-1001915333486, message)
        return {"msg": "Order created successfully"}

    def details_of(self, db: SessionType, order_id: int):
        return db.query(Orders).get(order_id)

    # a operation which updates the status of a order to Confirmed
    def update_order_status(self, db: SessionType, order_id: int):
        order = db.query(Orders).get(order_id)

        if order is None:
            return {"msg": "Order not found"}  # this will be a very rare case

        order.order_status = "Confirmed"
        db.commit()
        db.refresh(order)

        return {"msg": "Order status updated"}

    def retrieve_confirmed_orders(self, db: SessionType):
        """
        even now, i am still confused cause i had not decided the full arch of this app:
        so here's the thing. this method will list all the confirmed orders. it is the duty of
        the admin to mark them delivered after he delivers because on the UI it will also have the
        delivery status. this way he will be able to know which ones need to be prioritized as
        the database is not really well complex holding date values, in the future, i will implement
        that to make the admin have a easy job filtering through the days deliveries
        """
        confirmed_orders = (
            db.query(Orders)
            .filter(Orders.order_status == "Confirmed")
            .filter(Orders.delivery_status != "Delivered")
            .all()
        )
        return confirmed_orders

    # method to update order delivery status
    def update_order_delivery_status(self, db: SessionType, order_id: int):
        order = db.query(Orders).get(order_id)

        if order is None:
            return {"msg": "Order not found"}

        order.delivery_status = "Delivered"
        db.commit()
        db.refresh(order)
        return {"msg": "Order delivery status updated"}
