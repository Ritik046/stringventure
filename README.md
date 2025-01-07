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


# first user have to signup
![image_alt](https://github.com/Ritik046/stringventure/blob/7783992316e585128ef7ffdef029061a49b3b192/lib2.png)
# now user can login to request for borrowing book
![image_alt](https://github.com/Ritik046/stringventure/blob/f91f9325b17bef106088c903d8e585d829869dfb/lib1.png)
# user have to fill a form to request a book so that it is given by admin if available
![image_alt](https://github.com/Ritik046/stringventure/blob/20ebcfbb7c51820a7d42f73b97dccc21a8edd4f1/lb7.png)
# admin can login using their credential here for demo purpose-(userid: admin@123.com , password: 123456)
![image_alt](https://github.com/Ritik046/stringventure/blob/ea62b643dc6f1ddad00fc7f35b21469f469f3e39/lib4.png)
# now admin have access to grant request or decline it according to avilability of book
![image_alt](https://github.com/Ritik046/stringventure/blob/154d73d809502909a68e3ae5ed7ea7d816542d53/lb8.png)
# admin can add books which is visible to every user and user can request it
 ![image_alt](https://github.com/Ritik046/stringventure/blob/589875473955ef3c9001130d386b0f7ec62f4726/lib3.png)



