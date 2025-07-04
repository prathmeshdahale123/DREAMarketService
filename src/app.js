const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database")
const { propertyRouter } = require("./router/propertyRouter")
const { authRouter } = require("./router/authRouter")
const { favoriteRouter } = require("./router/favoriteRouter")
const { profileRouter } = require("./router/profileRouter")
require("dotenv").config();
const cors = require("cors");

const allowedOrigins = [
    "http://localhost:5173",
    "https://dream-market-service.vercel.app",
    'https://82786a53-d857-4646-8858-fa3d28bd0804.lovableproject.com',
    "http://localhost:8080"     
];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  }));

app.use(express.json());
app.use(cookieParser());

//health check route
app.get('/health', (_req, res) => {
      res.status(200).json({
        success: true,
        message: 'Backend is running',
      });
    });

    
app.use("/", propertyRouter)
app.use("/", authRouter)
app.use("/", favoriteRouter)
app.use("/", profileRouter)


  



connectDB()
.then(() => {
    console.log("database connected succesfully...");
    app.listen(process.env.PORT, () => {
        console.log("Server is listening on port");
    })
    
}).catch(() => {
    console.log("database connection failed!!!");
    
} )
