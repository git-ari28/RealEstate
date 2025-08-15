

https://github.com/user-attachments/assets/763d39da-0a5f-4d79-b830-de334bfdd529
# MERN Real Estate

A full-stack real estate application built with the **MERN** stack (MongoDB, Express.js, React, Node.js) that allows users to browse, list, and manage property listings.

---

## 🚀 Features
- 🔍 **Browse Listings** – View available properties with images, details, and pricing.
- 🏠 **Add New Properties** – Registered users can create, edit, and delete their own listings.
- 🔐 **Authentication** – Secure login and signup using JWT.
- 🖼️ **Image Uploads** – Upload property images.
- 📱 **Responsive Design** – Works seamlessly on desktop and mobile.

---

## 🛠 Tech Stack
**Frontend:** React, React Router, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** JWT (JSON Web Token)  
**Other Tools:** Axios, Cloudinary (for image hosting)

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/RealEstate.git
   cd RealEstate
Install dependencies

bash
Copy
Edit
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
Set up environment variables
Create a .env file in the root and add:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url
Run the application

bash
Copy
Edit
# Run backend
npm run dev

# Run frontend (in another terminal)
cd client
npm start
