const { Article, Author, Comment } = require("../db");

const showHome = async (req, res) => {
  const articles = await Article.findAll({
    limit: 200,
    order: [["createdAt", "DESC"]],
  });
  // res.json(articles);
  res.render("home", { articles });
};

const showArticle = async (req, res) => {
  const id = req.params.id;
  const articleInfo = await Article.findByPk(id);
  const authorInfo = await Author.findByPk(articleInfo.authorId);
  const commentInfo = await Comment.findAll({
    where: { articleId: articleInfo.authorId },
  });
  res.render("showArticle", { articleInfo, authorInfo, commentInfo });
};

const signUp = async (req, res) => {
  res.render("signUp");
};

const signUpPost = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const author = req.body.author;
  const email = req.body.email;
  let password = req.body.password;

  const bcrypt = require("bcrypt");
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        console.log("Error de algo" + err); // QUE ES?
      }

      const newAuthor = [];
      newAuthor.push({
        first_name: firstName,
        last_name: lastName,
        author: author,
        email: email,
        password: hash,
      });
      console.log(newAuthor);
      Author.bulkCreate(newAuthor);
    });
  });

  res.redirect("/");
};

const showSignin = async (req, res) => {
  res.render("signin");
};

// const postSignin = async (req, res, next) => {
//   const passport = require("passport");

//   console.log(req.body);
//   passport.authenticate("local", {
//     successRedirect: "/admin",
//     failureRedirect: "/login",
//   });
// };

const logout = async (req, res) => {
  req.logout();
  res.redirect("/");
};

//------------------------------------------------
module.exports = {
  showHome,
  showArticle,
  signUp,
  signUpPost,
  // postSignin,
  showSignin,
  logout,
};
