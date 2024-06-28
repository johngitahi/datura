# zipT Backend API Documentation

Base API URL: `https://api.example.com/`

## Table of Contents
* [Introduction](#introduction)
* [API Structure](#structure)
* [Running the API](#local)
    - [Using Docker](#docker)
* [Endpoints Summary](#endpoints)
* [Dependencies](#dependencies)
* [Important notes](#important-notes)

<a name="introduction"></a>

## Introduction

This is the API documentation for the app. This API provides endpoints for managing menus, hotels, orders, users, and payments. It allows you to create, retrieve, update, and delete various entities related to the zipT food delivery process.

<a name="structure"></a>
## Structure

The application is built using FastAPI and relies on SQLAlchemy for database interactions. I also tried to follow clean architecture principles when writing the API.

- Database: The API creates the database tables using SQLAlchemy. Tested on SQLite and PostgresDB.

- Dependencies: The API uses dependency injection to manage database sessions. The `get_db` function from `main.py` provides a database session for each request.


<a name="local"></a>
## Running the API Locally

### Prerequisites

Make sure you have Python 3.11.3 installed on your system.

Check your Python version:

```bash
python --version
```

#### Note

This API currently works on Python v3.11.3 only. I am not planning to extend compatibility(Docker saved me from doing that. Yes, I am lazy. But it's just a simple fix, trust me. The error I got when i ran it with v3.10.7 on Ubuntu was from the config.py file[if you want, you can try to solve it and PR if you manage to solve it]).

If you can't afford fixing it, i'd suggest you get v3.11.3 and set it as your Python interpreter for this project.

### Getting Started

Follow these steps to set up the API and run it locally:

1. Clone the Repository:
Begin by cloning the repository to your local machine using Git:

```bash
git clone git@github.com:johngitahi/Food-Delivery-Webapp.git
```

2. Set Up a Virtual Environment:
Change your working directory to the backend directory of the cloned repository and set up a virtual environment using Python's built-in venv module:

```bash
cd Food-Delivery-Webapp/backend
python -m venv .venv
```

3. Activate the Virtual Environment:
Activate the virtual environment. On Linux, use the following command:

```bash
source .venv/bin/activate
```

4. Install Requirements:
While in the virtual environment, navigate to the app directory and install the required packages using pip:

```bash
cd app
python -m pip install -r requirements.txt
```

5. Run the API:
Finally, launch the API using the uvicorn command:

```bash
uvicorn main:app
```
<a name="docker"></a>
## Docker
For setting up with Docker:

1. Build the Docker Image

Open a terminal and navigate to backend/app where the Dockerfile is located. Run the following command to build the Docker image:

```bash
docker build -t api .
```

now, create a docekr volume `docker volume create api_data` for persistent database.

2. Run the Docker Container

After the image is built, you can run a Docker container based on that image:

```bash
docker run -p 8000:8000 api
```

- for detached mode: add the `-d` flag

#### Notes on running the API locally

Open `http://localhost:8000/hotels` to see the API work.
You can also check out the interactive OpenAPI Swagger docs for the API at `http://localhost:8000/docs`


<a name="endpoints"></a>
## Endpoints

For full documentation(request params, responses, request data, etc), checkout the  [API reference](./API_REFERENCE.MD) or alternatively checkout the OpenAPI Swagger docs for the API.

The API offers the following endpoints to interact with different entities:

**1. Hotels:**

- **`GET /hotels:`** Retrieve a list of hotels.

- **`GET /hotels/{hotel_id}:`** Retrieve details of a specific hotel.

- **`GET /hotels/{hotel_id}/menu:`** Get the full menu for a specific hotel

**2. Orders:**

- **`POST /orders:`** Place a new order. Hitting this endpoint initiates a payment with M-Pesa STK push

- **`GET /orders/{order_id}:`** Retrieve details of a specific order.

- **`PUT /orders/{order_id}:`** Update the details of an existing order. (TBIL for admin mgmt, not needed rn)

- **`DELETE /orders/{order_id}:`** Delete a specific order. (TBIL for admin mgmt, not needed rn)


**3. Payments:**
- **`POST /payments/callback:`** Receive a payment callback from M-Pesa after the orders endpoint has been hit.

**4. Users:**
This functionality has not been implemented yet. I have it in mind, but, I am also thinking to setup Auth0 to handle user stuff for the API. Having protected routes such that, some endpoints will only be available to logged in users, that is, via Google, or hopefully WhatsApp

- **`GET /users/{user_id}:`** Retrieve details of a specific user.
- **`PUT /users/{user_id}:`** Update the details of an existing user.

<a name="dependencies"></a>
## Dependencies

The API utilizes repository classes to interact with the database:

- menu_repository: Manages menu-related stuff.
 
- hotel_repository: Manages hotel-related stuff.
 
- order_repository: Manages order-related stuff.
 
- user_repository: TBD

<a name="important-notes"></a>
## Important Notes

- Some endpoints, such as payment endpoints and user endpoints might not work as expected. Refer to the code comments for details.

- Circular import issues are present in the code(not totally, but they are), which are not resolved yet. Use the provided uvicorn command for running the API to avoid running into issues. Do not run `python main.py`

- I have not worked out a good error handling mechanism for the code. Errors rn are just very ambiguous and do not explain the problem very well.

- I have not written any tests for any API operation yet. that is a nightmare for me. But, this is my next stop after writing the documentation.


- For mpesa payments, you can use ngrok to tunnel the locally run API to the internet.

- You can use the `remove_pycache` shell script to remove the boring python bytecode.
