import express from "express";
import "dotenv/config";
import cors from "cors";
import {connectDB} from './lib/db.js';
import User from './models/user.model.js';
import { clerkMiddleware } from '@clerk/express'
import path from "path"
import fs from "fs"
import job from "./lib/cron.js"
const app = express();

// Server
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(),"public");
// Middlewares

app.use(express.json()) //tells Express to parse incoming JSON data from HTTP requests and put the parsed data into req.body.Without express.json() req.body will generally be undefined
app.use(cors({origin:FRONTEND_URL,credentials:true}))
app.use(clerkMiddleware())

// Test route
app.get("/health", (req, res) => {
  res.status(200).json({ok:true});
});

// if public directory exists, serve the static files
// this for the production build
if(fs.existsSync(publicDir)){
  app.use(express.static(publicDir)); // serve the built react files (static assets)
  app.get("/{*any}",(req,res,next)=>{ // works for all routes {*any}
    app.sendFile(path.join(publicDir,"index.html"),(err)=> next(err)); // any other url send main static asset the html file
  })
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);

  if(process.env.NODE_ENV==="production") job.start();
});