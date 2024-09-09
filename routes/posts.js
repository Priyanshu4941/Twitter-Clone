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
router.get("/newtweet",(req,res)=>{
    res.render("newtweet.ejs");
});

// new tweet post route
router.post("/newtweet",(req,res)=>{
    const date = new Date();
    const tweet = new postDetails({
        User : req.user.userId,
        Name : req.user.username,
        Text : req.body.text,
        Date : date
    });
    tweet.save()
    .then(()=>{
        console.log(`${req.user.username} tweeted at ${date}`);
        // res.send("saved your tweet");
        res.redirect("/profile");
    })
    .catch((err)=>{
        res.send("Error Saving your Tweet");
    })
});

export default router;
