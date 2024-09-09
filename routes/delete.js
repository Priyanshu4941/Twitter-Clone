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
  
router.get("/:id",(req,res)=>{
    const id= req.params.id;
    console.log(id);
    postDetails.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount === 1) {
        console.log(`Document with _id ${id} deleted successfully.`);
      } else {
        console.log(`Document with _id ${id} not found.`);
      }
      res.redirect("/profile");
    })
    .catch((error) => {
      console.error(`Error deleting document: ${error}`);
    });
})

export default router;