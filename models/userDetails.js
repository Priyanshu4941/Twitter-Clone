import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: Number,
  Password: String,
  Email: String,
  Name: String,
});

const userDetails = mongoose.model("twitterUsers", userSchema);

export default userDetails;
