
Sales Reporting System Documentation

Overview:
The Sales Reporting System is a full-stack application designed to streamline the process of recording, managing, and tracking invoices, receipts, and payments. It offers functionalities to store client information, dates, and financial transactions related to sales. Built using modern web technologies, the application ensures efficiency and reliability in managing sales data.

Technologies Used:

Frontend:

React: A JavaScript library for building user interfaces.
Tailwind CSS: A utility-first CSS framework for styling web applications.
Axios: A promise-based HTTP client for making asynchronous requests to the server.
Backend:

Node.js: A JavaScript runtime environment for executing server-side code.
Express.js: A web application framework for Node.js, providing robust features for building APIs and web applications.
MongoDB: A NoSQL database for storing structured data.
CORS: Cross-Origin Resource Sharing middleware to enable secure communication between the frontend and backend.

Features:

Invoice Management:

Create, edit, and delete invoices.
Track invoice status (e.g., pending, paid, overdue).
Generate invoice reports.

Receipt Management:

Record, edit and delete receipts for receipt received.
View receipt reports.

Payment Management:

Record, edit and delete Payments for payments received.
View payment reports.

Reports:

Sales
Expense 
Cash Flow 
Cash in Hand

Assumptions in the Sales Reporting System:

GST Rate:

The application assumes a Goods and Services Tax (GST) rate of 18% for all transactions.
This assumption simplifies tax calculations by applying a standard rate across all sales.

Architecture:

Frontend:

Utilizes React for building modular and reusable UI components.
Tailwind CSS for responsive and customizable styling.
Axios for handling HTTP requests to the backend API.
Backend:

Node.js with Express.js for building RESTful APIs.
MongoDB for storing sales data in a scalable and flexible NoSQL database.
CORS middleware for enabling communication between frontend and backend servers.
