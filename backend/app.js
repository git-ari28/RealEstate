import dotenv from "dotenv";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';  // Import cors


import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';
import propertyRoutes from "./routes/property.route.js";



dotenv.config();  // Load environment variables

const app = express();
const PORT = 8801;

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // Replace with your React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,  // Timeout after 5 seconds if server is not available
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB", err));

// Routes
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/properties", propertyRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



