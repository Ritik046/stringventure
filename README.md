# This is library management system using MERN stack

# Frontend Part-

# First Started with Create React App

# npm install
install all the required devDependencies

# npm start
Starts the development server.

Access the app at http://localhost:3000.
Any changes will make automatically reload the page

# npm test
Runs to check for issues in your components.

# npm run build
for creating app for production

# Backend Part-

# Set Up the Backend:
The backend is built using Node.js and Express.
It communicates with a database (e.g., MongoDB) to store book details, user requests, Borrow, etc.
The API endpoints handle different operations like adding books, borrowing books, and handling requests.

# API Endpoints:
Add Book: POST /books/create - Adds a new book to the database.
View Books: GET /books/all - Retrieves a list of all books in the library.
Handle Book Requests: GET /books/request/all - Gets all book requests made by users.
Update Borrowe Status: PUT /books/returned/update - Updates the status of a borrowed book when it is returned.
Accept/Decline Requests: Allows admins to approve or reject book requests from users.

# Database Operations:
Books, borrow details, and requests are stored in MongoDB collections.
CRUD operations are performed using Mongoose.

# Authentication & Authorization:
Admin authentication is handled to ensure only authorized users can add or manage books, borrower statuses, and requests.

# Environment Variables:
The backend API is connected to a cloud environment (e.g., Render) using environment variables for easy configuration and security.

# Error Handling:
Proper error handling is in place to catch and display any issues with API requests or database operations.



