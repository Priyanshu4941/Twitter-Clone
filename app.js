import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import user from "./routes/user.js";
import profile from "./routes/profile.js";
import posts from "./routes/posts.js";
import deletePost from "./routes/delete.js";
import feed from "./routes/feed.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 3000;

mongoose.connect(process.env.DATABASE)
.then(()=>{
  console.log("Connected to Database");
})
.catch((Err)=>{
  console.log("Error", Err);
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// defineing routes
app.use("/",user);
app.use("/profile",profile);  
app.use("/post",posts);
app.use("/delete",deletePost);
app.use("/feed",feed);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});