# Car Rental App

A modern web application for renting cars, built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Firebase**.  
This project allows users to browse available cars, make bookings, and see their bookings through an intuitive, responsive interface.

---

## 🌟 Features

- User authentication with **Firebase** (email/password)
- Login/logout flow
- Protected routes (Bookings page)
- Browse available cars with images and details
- View car details on a separate page
- Book cars online with a form and basic validation
- View own bookings (protected route)
- Responsive design for desktop and mobile
- Redux Toolkit for global state management
- MongoDB Atlas integration
- Backend APIs with Node.js/Express for user management
- Clean, modern UI with reusable components (header/footer)

---

## 🛠️ Tech Stack

- **Frontend:** Next.js + TypeScript + Tailwind CSS  
- **State Management:** Redux Toolkit  
- **Authentication :** Firebase Authentication 
- **Backend:** Node.js + Express
- **Database:** Firestore + MongoDB Atlas (via )
- **Deployment:** Vercel  

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x  
- npm >= 9.x  

### Installation


```bash
#Clone the repository:
git clone https://github.com/NethmiHasi/car-rental-app.git
```

### Frontend Setup

```bash
# Navigate to the frontend folder:
cd car-rental-app/frontend

# Install dependencies
npm install

#run the development server
npm run dev

```
Open http://localhost:3000
 in your browser.

---

### Backend Setup

```bash
# Navigate to the backend folder
cd car-rental-app/backend

# Install dependencies
npm install

# Create a .env file with your MongoDB URI
# Example:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/carRental
# PORT=5000

# Start the server
npm run dev   # if using nodemon
# or
node server.js

```

## 📦 Folder Structure

```bash
car-rental-app/
├─ frontend/          # Next.js frontend application
│  ├─ app/            # Pages and layouts
│  ├─ components/     # Reusable React components
│  ├─ hooks/          # Custom React hooks
│  ├─ redux/          # Redux slices and store
│  ├─ public/         # Images, icons, static files
│  └─ package.json    # Frontend dependencies
│
├─ backend/           # Node.js + Express backend
│  ├─ controllers/    # Route controllers
│  ├─ models/         # Mongoose models
│  ├─ routes/         # Express routes
│  ├─ config/         # Database and environment configuration
│  ├─ server.js       # Entry point of the backend
│  └─ package.json    # Backend dependencies
│
├─ README.md          # Project documentation

```

---

## 🌐 Deployment

The application is deployed on Vercel:
https://car-rental-app-lemon.vercel.app

---

## 👩‍💻 Author

Nethmi Hasinthara

GitHub: https://github.com/NethmiHasi
