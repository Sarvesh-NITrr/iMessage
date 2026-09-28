import express from "express";
import "dotenv/config";
import cors from "cors";
import {connectDB} from './lib/db.js';
import User from './models/user.model.js';
import { clerkMiddleware } from '@clerk/express'
const app = express();

// Server
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Middlewares

app.use(express.json()) //tells Express to parse incoming JSON data from HTTP requests and put the parsed data into req.body.Without express.json() req.body will generally be undefined
app.use(cors({origin:FRONTEND_URL,credentials:true}))
app.use(clerkMiddleware())

// Test route
app.get("/health", (req, res) => {
  res.status(200).json({ok:true});
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});