# 🚀 ReviewPilot

### AI-Powered Code Review & Refactoring Platform

ReviewPilot is a full-stack AI-powered code review platform that helps developers analyze code, detect bugs, identify security issues, improve performance, and generate refactored code automatically.

Built with React, Node.js, Express, MongoDB, and Groq AI.

---

## 🌐 Live Demo

### Frontend

https://codeguard-ai-one.vercel.app

### Backend

https://codeguard-ai-nh4z.onrender.com

---

## ✨ Features

### 🤖 AI Code Review

* Bug Detection
* Security Analysis
* Performance Suggestions
* Clean Code Recommendations
* AI Generated Summary
* Code Quality Scoring

### 🔄 AI Refactoring

* Generates improved code automatically
* Preserves original functionality
* Improves readability and maintainability
* Before vs After comparison view

### 🐙 GitHub Repository Review

* Fetch public GitHub repositories
* Browse repository files
* Load repository files into Monaco Editor
* Review GitHub code directly with AI

### 📊 Analytics Dashboard

* Total Reviews
* Average Score
* Issues Found

### 📜 Review History

* Persistent review storage
* Review summaries
* Review scores
* Clear history functionality

### 🔐 Authentication

* User Registration
* Login & Logout
* Protected Routes
* JWT Authentication

### 📱 Responsive Design

* Mobile Friendly UI
* Responsive Dashboard
* Mobile Sidebar Navigation
* Responsive GitHub Repository Explorer

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Monaco Editor
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

### AI

* Groq API
* Llama 3.3 70B Versatile

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 🏗 System Architecture

User
↓
React Frontend
↓
Express API
↓
MongoDB Atlas

### AI Review Flow

User Code
↓
Groq AI
↓
Bug Analysis
Security Review
Performance Review
Clean Code Suggestions
Refactored Code
↓
Stored in MongoDB

### GitHub Review Flow

GitHub Username
↓
Fetch Repositories
↓
Select Repository
↓
Select File
↓
Load Into Monaco Editor
↓
AI Review

---

## 📸 Screenshots

### Dashboard

* Analytics Overview
* Monaco Editor
* GitHub Repository Review

### AI Review Results

* Score Card
* Bug Detection
* Security Analysis
* Performance Suggestions
* Clean Code Review

### Before vs After Refactoring

* Original Code
* Refactored Code Comparison

### Review History

* Stored Reviews
* Review Scores
* Review Summaries

(Add screenshots here)

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone https://github.com/your-username/reviewpilot.git
cd reviewpilot
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

## 🎯 Future Improvements

* Copy Refactored Code
* Download Refactored Code
* Multi-file Repository Analysis
* Repository-wide AI Review
* GitHub OAuth Integration
* Team Collaboration Features

---

## 📚 Key Learnings

This project helped me gain practical experience with:

* React Component Architecture
* State Management
* REST APIs
* Authentication & Authorization
* MongoDB & Mongoose
* AI Integration
* GitHub API Integration
* Responsive Design
* Full Stack Deployment
* Production Debugging

---

## 👨‍💻 Author

### Priyanshu Kumar Pandey

GitHub:
https://github.com/Priyanshupandey77

LinkedIn:
https://www.linkedin.com/in/priyanshu-pandey-17b951324

---

⭐ If you found this project interesting, consider giving it a star..
