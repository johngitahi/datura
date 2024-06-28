# ZipT Standard API Reference

Definitions

`BASE_API`: https://api.example.com


## Table of Contents
* [Hotel Entity](#hotel-entity)
* [Menu Entity](#menu-entity)
* [Order Entity](#order-entity)

<a name="hotel-entity"></a>
## The Hotel Entity

The base url for working with the hotel repository is `BASE_API/hotels`, so for example to get the details of a specific hotel with hotel_id 42, you'd send a GET request to `BASE_API/hotels/42`

### List of All Hotels

Retrieve a list of all hotels.

- **URL:** `/`
- **Method:** GET
- **Description:** This endpoint returns a list of all hotels in the database.
- **Sample Response:**
```json
[
	{"id": 1, "name": "Hotel Magic", "location": "Opposite Gate B", "phone": 0742884299},
	{"id": 2, "name": "Fivio Hotel", "location": "Near Baraka Shop","phone": 0742884299}
]
```


### Details of a Specific Hotel

Retrieve detailed information about a specific hotel.

- **URL:** `/{hotel_id}`
- **Method:** GET
- **Description:** This endpoint provides detailed information about a specific hotel identified by its hotel_id.
- **Parameters:**
    hotel_id (int): ID of the hotel.
- **Sample Response Format:**

```json

{
  "id": 1,
  "name": "Hotel A",
  "location": "City A",
  "phone": "0742884299"
}
```

### Retrieve the Menu Items for a Hotel

Retrieve the menu items available at a specific hotel.

- **URL:** `/{hotel_id}/menu`
- **Method:** GET
- **Description:** This endpoint returns a list of menu items available at a specific hotel.
- **Parameters:**
    hotel_id (int): ID of the hotel.
- **Sample Response Format:**

```json
[
  {
    "price": 100,
    "item_name": "Burger",
    "hotel_id": 1

  },
  {
    "menu_id": 2,
	  "price": 300,
    "item_name": "Pizza",
	  "hotel_id": 1
  }
]
```

