var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/createUser", async function (req, res, next) {
  let createdUser = await userModel.create({
    username: "User1",
    password: "user1@123",
    posts: [],
    email: "user1@gmail.com",
    fullName: "User Roy",
  });

  res.send(createdUser);
});

router.get("/createPost", async function (req, res, next) {
  let createdPost = await postModel.create({
    postText: "Hello, I am User1",
  });

  res.send(createdPost);
});

module.exports = router;
