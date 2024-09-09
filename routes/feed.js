// user.js
import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import userDetails from "../models/userDetails.js";
import postDetails from "../models/postSchema.js";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const secretkey = process.env.SECRETKEY;

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

// new tweet get route
router.get("/",(req,res)=>{
    postDetails.find()
    .then((details)=>{
        console.log(details);
        res.render("feed.ejs",{
            tweets:details
        });
    })
    .catch((err)=>{
        console.log(err);
        res.send("Cannot fetch feed");
    })
    // res.render("feed.ejs");
});


export default router;
