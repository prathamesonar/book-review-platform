# 📚 Book Review Platform - MERN Stack

A full-stack Book Review Platform built with the MERN stack (MongoDB, Express, React, Node.js). This project allows users to sign up, log in, add, and review books. It features a complete authentication system, CRUD operations for books and reviews, and a range of bonus features including live search, sorting, dark mode, and data visualization.

---

## 🌐 Live Demo

* **Frontend (Vercel):** [https://book-review-sand.vercel.app/](https://book-review-sand.vercel.app/)
* **Backend (Render):** [https://book-review-backend-5kr1.onrender.com/](https://book-review-backend-5kr1.onrender.com/)

---

## ✨ Screenshots

*(Add your own screenshots here. You can capture images of the home page, book details page, profile, etc., and place them in a folder to link them here.)*

| Home Page (Dark Mode)                                | Book Details Page                                      |
| ---------------------------------------------------- | ------------------------------------------------------ |
| ![Home Page](https://github.com/user-attachments/assets/55547a0b-4dfa-472d-b9a1-2982cc924597) | ![Book Details Page](./path/to/your/details-page.png) |

| Profile Page                                      | Edit Review Modal                                      |
| ------------------------------------------------- | ------------------------------------------------------ |
| ![Profile Page](./path/to/your/profile-page.png) | ![Edit Review Modal](./path/to/your/edit-modal.png) |

---

## 🚀 Features

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

### ⭐ Bonus Features
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
