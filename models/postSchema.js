import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  User: Number,
  Name: String,
  Text: String,
  Date: String,
});

const postDetails = mongoose.model("twitterPosts", postSchema);

export default postDetails;
