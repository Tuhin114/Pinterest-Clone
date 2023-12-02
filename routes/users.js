const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/Pinterest");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String, // No need to explicitly specify 'required', passport-local-mongoose handles it
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  dp: String, // Considering dp is a string representing the image URL or path
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: String, // String type for full name
});

// Apply the passport-local-mongoose plugin to your schema
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email", // Assuming email is used as the username for login
});

const User = mongoose.model("User", userSchema);

module.exports = User;
