// user.js
import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import userDetails from "../models/userDetails.js";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const secretkey = process.env.SECRETKEY;

router.use(cookieParser());
router.use(express.static("public"));
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/",(req,res)=>{
  res.render("loadingpage.ejs");
});

router.get("/sign",(req,res)=>{
  res.render("login.ejs");
});

router.post("/signin",(req,res)=>{
  console.log(req.body);
  console.log("user trying to login");
  userDetails.findOne({_id:req.body.mobile})
  .then((details)=>{
    if(details==null){
      res.send("User does not exits..!");
    }else{
      if(details.Password==req.body.password){
        const token = jwt.sign({ userId: details._id, username: details.Name ,email : details.Email}, secretkey, { expiresIn: '1h' });
        res.cookie('authToken', token, { httpOnly: true });
        res.redirect("/profile");
      }else{
        res.send("Wrong Password");
      }
    }
  })
  .catch((err)=>{
    res.send(err);
  })
});

router.post("/signup",(req,res)=>{
  console.log(req.body);
  console.log("user trying to signup");
  const user = new userDetails({
    _id:req.body.mobile,
    Password: req.body.password,
    Email: req.body.email,
    Name: req.body.name,
  });
  user.save()
  .then(()=>{
    res.redirect("/sign");
  })
  .catch((err)=>{
    res.send("Error registering you..!");
  })
});

export default router;
