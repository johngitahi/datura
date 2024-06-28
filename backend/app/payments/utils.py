import requests
from requests.auth import HTTPBasicAuth
import datetime
import base64

from config import settings

# just use the mpesa library i have written, this is too elaborate and tiresome to maintain
def get_mpesa_token():
    consumer_key = settings.consumer_key
    consumer_secret = settings.consumer_secret
    api_URL = settings.mpesa_auth_endpoint

    encoded_auth = HTTPBasicAuth(consumer_key, consumer_secret)
    # print(consumer_key)
    # print(consumer_secret)
    # print(api_URL)

    try:
        response = requests.get(api_URL, auth=encoded_auth).json()

        return response["access_token"]  # expires after 3599 seconds

    except Exception as e:
        print(
            e
        )  # implement a looger that i can use to see logs without necess. accessing the server


async def encode_password(short_code: int, passkey: str, timestamp: str):
    till_number = str(short_code)

    data_to_encode = till_number + passkey + timestamp

    online_password = base64.b64encode(data_to_encode.encode())
    decode_password = online_password.decode("utf-8")

    # print(online_password)
    # print(decode_password)

    return decode_password


async def trigger_stkp_payment(amount: int, client_mpesa_no: int):
    # subroutine to trigger an stk push

    auth_token = get_mpesa_token()
    utc_time_now = datetime.datetime.utcnow()
    kenya_time_now = utc_time_now + datetime.timedelta(hours=3)
    timestamp = kenya_time_now.strftime("%Y%m%d%H%M%S")
    passkey = settings.passkey
    psswd_token = await encode_password(
        settings.short_code, passkey, timestamp
    )  # is the b64 below; on line 31, tho it should be created for every transaction, have another function do this

    headers = {
        "Content-Type": "application/json",  # i am removing this as per
        # https://stackoverflow.com/a/73383831; oh shit, it must be there on production calls. what, spent a lot of time on this!!!!
        "Authorization": f"Bearer {auth_token}",
    }

    payload = {
        "BusinessShortCode": settings.short_code,  # test; that guy talking about making childs for the store number, i am worried this might not work without those, however let me dig, that'd be a last resort
        "Password": psswd_token,
        "Timestamp": timestamp,  # i am thinking i should put the datetime function here for accuracy
        "TransactionType": "CustomerBuyGoodsOnline",  # replace with CustomerBuyGoodsOnline at prod
        "Amount": amount,
        "PartyA": client_mpesa_no,
        "PartyB": settings.till_number,
        "PhoneNumber": client_mpesa_no,
        "CallBackURL": "https://api.example.com/pay/callback/",  # i was ngrok all along, caused errors
        "AccountReference": "zipT Food Delivery",
        "TransactionDesc": "Your Food and Delivery Fee",
    }

    response = requests.post(
        settings.mpesa_express_endpoint, headers=headers, json=payload, timeout=10
    )

    # print(settings.mpesa_express_endpoint)
    # print(payload)
    # print(response.json())
    # print(response.json()) # returns <Response [400]> and idky; update:figured
    # it out. apparently, you must first parse the response to a python native
    # ds first using .json()

    return response.json()
