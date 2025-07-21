# E-Commerce Backend 🛒

A backend for an e-commerce platform built using **Node.js**, **Express**, and **MongoDB**, with **Stripe** for payment processing.

## 📦 Features

- User registration & login (JWT-based)
- Product catalog (CRUD operations)
- Cart management
- Stripe payment gateway integration
- Order management

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Stripe (test mode)
- JWT Authentication

## 🚀 Getting Started

### First, Clone the Repo

### Install Dependencies
npm install

### Create a .env file 
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
CLIENT_URL=http://localhost:3000

### API Endpoints
| Method | Route                        | Description       |
| ------ | ---------------------------- | ----------------- |
| `POST` | /api/auth/register           | Register new user |
| `POST` | /api/auth/login              | Login user        |
| `GET`  | /api/products                | Get all products  |
| `POST` | /api/products                | Create product    |
| `POST` | /api/cart                    | Add to cart       |
| `POST` | /api/create-checkout-session | Stripe checkout   |

You can test all routes using Postman.

### Stripe Test Cards
Use the card 4242 4242 4242 4242 with any valid future date, CVC, and postal code for testing payments.

Built with ❤️ by Harshiv
