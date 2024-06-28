# zipT - Frontend

[![Netlify Status](https://api.netlify.com/api/v1/badges/b215180b-2971-48c1-b8f7-1e1ec6d2eca0/deploy-status)](https://app.netlify.com/sites/ziptfoods/deploys)

This is zipT frontend source code. zipT allows users to browse restaurants, view menus, place orders, and manage their food deliveries. The frontend is built using React and interacts with a FastAPI backend for data and authorization.

## Getting Started

These instructions will help you set up and run the frontend locally on your machine.

### Prerequisites

- Node.js and npm (or Yarn) installed on your machine.

### Setting up the environment
1. Install the dependencies
```bash
npm install / yarn install
```

### Usage
1. To start the development server (for dev only, on prod do prod procedure)
```bash
npm run dev / yarn dev
```
open `http://localhost:5173` in your browser to see the application.


## Features

- [x] Browse restaurants and their menus.
- [x] Add items to the cart and proceed to checkout.
- [x] Checkout and pay with M-Pesa via a STKpush
- [ ] User authentication and profile management.
- [ ] Order history and tracking.


## Contributing
If you find a bug or want to add a new feature, please follow these steps:

1. Create a new branch for your feature/fix.
2. Make your changes and commit them.
3. Push your changes to the new branch you've created.
4. Create a pull request.
