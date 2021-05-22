const express = require("express");
const publicRouter = express.Router();
const publicController = require("../controllers/publicController.js");

publicRouter.get("/", publicController.showHome);
publicRouter.get("/article/:id", publicController.showArticle);

publicRouter.get("/registro", publicController.signUp);
publicRouter.post("/registro", publicController.signUpPost);

publicRouter.get("/login", publicController.showSignin);

publicRouter.get("/logout", publicController.logout);

// publicRouter.post("/login", publicController.postSignin);

const passport = require("passport");
publicRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
  })
);

module.exports = publicRouter;
