var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/allUserPosts", async function (req, res, next) {
  let user = await userModel
    .findOne({ _id: "656487e04d9171478fb40c85" })
    .populate("posts");
  res.send(user);
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
    postText: "Hello, how are you?",
    user: "656487e04d9171478fb40c85",
  });

  let user = await userModel.findOne({ _id: "656487e04d9171478fb40c85" });
  user.posts.push(createdPost._id);
  await user.save();
  res.send("Done!");
});

module.exports = router;
