# 📚 Book Review Platform - MERN Stack

A full-stack Book Review Platform built with the MERN stack (MongoDB, Express, React, Node.js). This project allows users to sign up, log in, add, and review books. It features a complete authentication system, CRUD operations for books and reviews, and a range of features including live search, sorting, dark mode, and data visualization.

---

## 🌐 Live Demo

* **Frontend (Vercel):** [https://book-review-sand.vercel.app/](https://book-review-sand.vercel.app/)
* **Backend (Render):** [https://book-review-backend-5kr1.onrender.com/](https://book-review-backend-5kr1.onrender.com/)

---

##  Screenshots


| Home Page (Dark Mode)                                | Book Details Page                                      |
| ---------------------------------------------------- | ------------------------------------------------------ |
| ![Home Page](https://github.com/user-attachments/assets/55547a0b-4dfa-472d-b9a1-2982cc924597) | ![Book Details Page](https://github.com/user-attachments/assets/fa6e259a-9ef9-43ab-877c-d34d34daae78) |

| Profile Page                                      | Edit Review Modal                                      |
| ------------------------------------------------- | ------------------------------------------------------ |
| ![Profile Page](https://github.com/user-attachments/assets/a4a2c276-8dc6-4472-bbda-a786eea85148) | ![Edit Review Modal](https://github.com/user-attachments/assets/f6b88da4-7df0-4e51-87d9-a5cf8670d8c6) |

---

##  Features

### Core Features
* **User Authentication**: Secure sign-up and login system using JWT (JSON Web Tokens) and password hashing with `bcrypt`.
* **Protected Routes**: Middleware to protect sensitive routes and operations, ensuring only authenticated users can perform certain actions.
* **Book Management (CRUD)**:
    * Users can add new books with details like title, author, genre, etc.
    * Only the user who added a book can edit or delete it.
    * All users can view a paginated list of all books.
* **Review System (CRUD)**:
    * Logged-in users can add reviews with a 1-5 star rating and text.
    * Users can edit or delete their **own** reviews.
    * The average rating for each book is calculated and displayed dynamically.
* **Pagination**: The main book list is paginated (5 books per page) for better performance and user experience.
* **Profile Page**: A dedicated page for users to see a list of books they've added and reviews they've written.

### Extra Features
* **Live Search & Filter**: A dynamic search bar that provides instant results as the user types. Users can also filter the book list by genre.
* **Sorting**: Ability to sort the book list by published year or average rating.
* **Data Visualization**: A modern **Donut Chart** on the book details page to show the rating distribution (built with Recharts).
* **Dark/Light Mode**: A theme toggle for a comfortable viewing experience in different lighting conditions.
* **Deployment**: The application is fully deployed with the frontend on Vercel and the backend on Render.
* **API Documentation**: A Postman collection is available for testing all backend API endpoints.

---

## 🛠️ Tech Stack

* **Frontend**:
    * React (with Vite)
    * React Router
    * Tailwind CSS
    * Axios
    * Recharts
* **Backend**:
    * Node.js
    * Express.js
    * Mongoose
    * JSON Web Token (JWT)
    * bcrypt.js
* **Database**:
    * MongoDB Atlas

---

## ⚙️ Local Setup and Installation

To run this project on your local machine, follow these steps:

### Prerequisites
* Node.js and npm installed.
* A MongoDB Atlas account and connection string.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/book-review-platform.git](https://github.com/your-username/book-review-platform.git)
cd book-review-platform
```
### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Create a .env file and add your variables
-MONGO_URI=YOUR_MONGO_URI_HERE
-JWT_SECRET=yourjwtsecretkey
-PORT=5000
-CORS_ORIGIN=http://localhost:5173

The backend will be running on http://localhost:5000 

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will open on http://localhost:5173.

## API Endpoints
A brief overview of the main API routes available.

-User Routes
-`POST /api/users/register`: Register a new user.

-`POST /api/users/login`: Authenticate a user and get a token.

-`GET /api/users/profile`: (Protected) Get the logged-in user's profile.

-Book Routes
-`GET /api/books`: Get a paginated, searchable, and sortable list of all books.

-`GET /api/books/:id`: Get a single book by its ID.

-`POST /api/books`: (Protected) Add a new book.

-`PUT /api/books/:id`: (Protected) Update a book (only by its creator).

-`DELETE /api/books/:id`: (Protected) Delete a book (only by its creator).

-`GET /api/books/mybooks`: (Protected) Get all books added by the logged-in user.

-Review Routes
`GET /api/reviews/book/:bookId`: Get all reviews for a specific book.

-`POST /api/reviews`: (Protected) Add a new review for a book.

-`PUT /api/reviews/:id`: (Protected) Update a review (only by its author).

-`DELETE /api/reviews/:id`: (Protected) Delete a review (only by its author).

-`GET /api/reviews/myreviews`: (Protected) Get all reviews written by the logged-in user.


