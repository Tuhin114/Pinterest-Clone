const express = require("express");
const router = express.Router();
const userModel = require("./users");
const passport = require("passport");

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/profile", isLoggedIn, function (req, res, next) {
  res.send("profile");
});

router.post("/register", function (req, res) {
  const { username, email, fullName, password } = req.body;

  const newUser = new userModel({ username, email, fullName });

  userModel.register(newUser, password, function (err, user) {
    if (err) {
      console.error(err);
      return res.redirect("/"); // Redirect to home page on registration error
    }
    // After successful registration, authenticate the user and redirect to the profile page
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
