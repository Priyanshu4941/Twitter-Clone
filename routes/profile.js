//(this is only accessible to the user having valid token)
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import userDetails from "../models/userDetails.js";
import postDetails from "../models/postSchema.js";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const secretkey = process.env.SECRETKEY;

//Middleware's
router.use(cookieParser());
router.use(express.static("public"));
router.use(bodyParser.urlencoded({ extended: true }));

// Middleware to verify the token before accessing further routes
const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, secretkey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
};
router.use(verifyToken); 
  
// profile get route
router.get("/",(req,res)=>{
    postDetails.find({ User: req.user.userId })
    .then((details)=>{
        res.render("profile.ejs",{
          tweets:details,
          mobile : req.user.userId,
          email : req.user.email,
          name : req.user.username
        });
    })
    .catch((err)=>{
        res.send(err);
    })
});

router.get("/securedroute1",(req,res)=>{
    res.send("working");
});

export default router;