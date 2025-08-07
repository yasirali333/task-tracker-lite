# Task Tracker Lite

A simple full-stack MERN application where users can **sign up**, **log in**, and **manage personal tasks** with authentication and due-date logic.

---

##  Project Structure

task-tracker-lite/
├── backend/
├── frontend/
└── README.md

yaml
Copy
Edit

---

## ⚙️ Tech Stack

### 🔧 Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (Password hashing)
- dotenv

### 🌐 Frontend:
- Next.js (TypeScript)
- Tailwind CSS
- Axios

---

## 📦 Setup Instructions

### 1️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
✅ Required .env file:
Create a .env file in /backend directory:

env
Copy
Edit
PORT=5000
JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb://localhost:27017/yasirdb
2️⃣ Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev