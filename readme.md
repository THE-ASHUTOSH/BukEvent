# 🎟️ Event Booking App

A simple full-stack web app that allows users to browse events, book tickets, and manage their bookings. Admins can create and manage events.

---

## 🧠 Overview
Built with the **MERN stack (MongoDB, Express, React, Node.js)** — includes user authentication, event CRUD, and ticket booking.

---

## ⚙️ Tech Stack
- **Frontend:** React.js, Axios, React Router  
- **Backend:** Node.js, Express.js, JWT, bcrypt  
- **Database:** MongoDB (Mongoose)

---

## 🚀 Features
- User registration & login  
- Browse and view events  
- Book and cancel tickets  
- Admin: create, update, delete events  

---

## 🔗 API Endpoints

### User
- `POST /api/users/register` – Register  
- `POST /api/users/login` – Login  
- `GET /api/users/profile` – User details  

### Events
- `GET /api/events` – All events  
- `GET /api/events/:id` – Single event  
- `POST /api/events` – Add event *(Admin)*  
- `PUT /api/events/:id` – Update event *(Admin)*  
- `DELETE /api/events/:id` – Delete event *(Admin)*  

### Bookings
- `POST /api/bookings` – Book event  
- `GET /api/bookings` – User’s bookings  
- `PUT /api/bookings/:id/cancel` – Cancel booking  

---

## ⚡ Setup
```bash
# Clone repo
git clone https://github.com/yourusername/event-booking-app.git
cd event-booking-app

# Backend setup
cd backend && npm install
# Add .env -> MONGO_URI, JWT_SECRET, PORT
npm run dev

# Frontend setup
cd ../frontend && npm install && npm run dev
