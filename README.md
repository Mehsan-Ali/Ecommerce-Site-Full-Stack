Full-Stack Web Application 

This project is a modern full-stack web application built with the MERN stack. 

It includes a React + TypeScript + Vite frontend, a Node.js + Express backend, and MongoDB for data storage. 

The application is structured for scalability, maintainability, and production readiness, with features such as authentication, payments, and cloud-based media management. 

 

Tech Stack 

Frontend (Client) 

React 19 with Vite 7 

TypeScript 

Tailwind CSS 4 for responsive design 

React Hook Form and Zod for form validation 

Redux Toolkit for state management 

React Router DOM for navigation 

React Toastify for notifications 

Axios for API communication 

Admin Panel 

Separate React + TypeScript + Vite application 

Zod validation and React Hook Form integration 

Designed for managing data, users, and transactions 

Backend (Server) 

Node.js with Express 5 

MongoDB with Mongoose 8 

JWT-based authentication with cookies 

Password hashing with Bcrypt 

Image uploads using Cloudinary 

Payment processing via Razorpay and Stripe 

File uploads handled by Multer 

Environment configuration using dotenv 

Middleware setup with CORS and cookie-parser 

 

Features 

User authentication (registration and login with JWT) 

Secure password encryption with Bcrypt 

Cloud-based media uploads with Cloudinary 

Payment integration using Razorpay and Stripe 

RESTful API architecture 

Responsive UI built with Tailwind CSS 

Form validation using React Hook Form and Zod 

Type-safe development with TypeScript 

Modular, scalable folder structure 

Environment-based configuration for different deployment stages 
 

Installation and Setup 

1. Clone the repository 

git clone https://github.com/your-username/your-repo-name.git 
cd your-repo-name 

2. Backend setup 

cd backend 
npm install 
npm run server 

 
Create a .env file inside the backend folder with the following keys: 
PORT=5000 
MONGO_URI=your_mongodb_connection_string 
JWT_SECRET=your_jwt_secret 
CLOUDINARY_NAME=your_cloudinary_name 
CLOUDINARY_API_KEY=your_cloudinary_key 
CLOUDINARY_API_SECRET=your_cloudinary_secret 
RAZORPAY_KEY_ID=your_razorpay_key 
RAZORPAY_KEY_SECRET=your_razorpay_secret 
STRIPE_SECRET_KEY=your_stripe_key 
PORT=5000 MONGO_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret CLOUDINARY_NAME=your_cloudinary_name CLOUDINARY_API_KEY=your_cloudinary_key CLOUDINARY_API_SECRET=your_cloudinary_secret RAZORPAY_KEY_ID=your_razorpay_key RAZORPAY_KEY_SECRET=your_razorpay_secret STRIPE_SECRET_KEY=your_stripe_key 
 
