# Lavishta - E-commerce Website - MERN Stack

## Overview
This project is a full-featured **E-commerce Website** developed using the **MERN stack** (MongoDB, Express.js, React, Node.js). It includes a secure authentication system using **JWT (JSON Web Tokens)** and role-based authorization for admin and user access. The application uses **Redux** for state management, providing a centralized store to handle user sessions, products, and cart functionality efficiently.

> Try the app - [Go to website](https://lavishta.netlify.app/)

## Features
- **Authentication**: Secure user registration and login using JWT.
- **Role-Based Authorization**: Admin users have privileged access to manage products, orders, and users, while regular users can browse and purchase products.
- **Product Management**: Add, edit, and delete products (admin access only).
- **Cart System**: Add items to a cart and proceed to checkout.
- **Order Management**: Place orders and view order history.
- **Search and Filtering**: Search products and filter them by categories, price range, and more.
- **Responsive Design**: Mobile-friendly user interface.

## Tech Stack
### Frontend
- **React**: For building a dynamic and responsive user interface.
- **Redux**: For managing application state in a centralized store.
- **Axios**: For API communication.
- **Bootstrap**: For responsive design and styling.

### Backend
- **Node.js**: For server-side scripting.
- **Express.js**: For building RESTful APIs.
- **MongoDB**: As the NoSQL database for persistent storage.
- **JWT**: For secure user authentication and session management.

### Other Tools
- **Postman**: For API testing.
- **Mongoose**: For MongoDB object modeling.
- **Git**: For version control.

## System Architecture
The application follows a **3-tier architecture**:
1. **Frontend**: Handles user interactions and communicates with the backend via REST APIs.
2. **Backend**: Implements business logic, authentication, and API endpoints.
3. **Database**: Stores user information, product details, and orders.

## Installation and Setup
### Prerequisites
- Node.js
- MongoDB

### Steps to Run
#### Backend
1. Clone the repository and navigate to the backend folder:
   ```bash
   git clone https://github.com/farhan0001/Lavishta.git
   cd Lavishta
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in a `/backend/config/config.env` file:
   ```env
    PORT=5000
    DB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRE=custom_time
    COOKIE_EXPIRE=custom_time
    SMPT_MAIL=your_smpt_email
    SMPT_PASSWORD=your_smpt_password
    SMPT_SERVICE=gmail
    SMPT_HOST=smtp.gmail.com
    SMPT_PORT=465
    CLOUDINARY_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    STRIPE_API_KEY=your_stripe_test_api_key
    STRIPE_SECRET_KEY=your_stripe_test_api_secret
    FRONTEND_URL=http://localhost:3000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

#### Frontend
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in a `/frontend/.env` file:
   ```env
   REACT_APP_BACKEND_URI=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm start
   ```

#### Access the Application
- Open your browser and navigate to `http://localhost:3000`.

## Usage
1. **User Registration/Login**: Create an account or log in to access features.
2. **Browse Products**: Explore products and add them to your cart.
3. **Admin Access**: Log in as an admin to manage products, orders, and users.
4. **Place Orders**: Add items to your cart and proceed to checkout.
5. **Order History**: View your past orders in the user dashboard.

## Contact
- **Email**: farhanquamar2021@gmail.com
