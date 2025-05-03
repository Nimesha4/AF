import express from 'express';
import cors from 'cors';  
import countryRoutes from './routes/countriesRoute.js'; 
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'; 
import dotenv from 'dotenv';


dotenv.config();

mongoose.connect(process.env.Mongo_DB)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });



const app = express();
const port = 8080;

// Apply CORS middleware globally for all routes
app.use(cors()); 

// Middleware to parse JSON requests
app.use(express.json());



// Use country routes
app.use('/api', countryRoutes);
app.use('/api/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
