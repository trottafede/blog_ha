const { Article, Author, Comment } = require("../db");

const showAdmin = async (req, res) => {
  const articles = await Article.findAll({
    limit: 200,
    order: [["createdAt", "DESC"]],
  });
  res.render("admin", { articles });
};

const deleteAdmin = async (req, res) => {
  const fs = require("fs");
  const path = require("path");

  const id_article = req.params.id;
  const article = await Article.findByPk(id_article);

  const truePath = path.join(__dirname, "..", "public");
  try {
    fs.unlinkSync(truePath + article.image);
    console.log("File removed");
  } catch (err) {
    console.error("Something wrong happened removing the file", err);
  }

  await Article.destroy({
    where: { id: id_article },
  });

  showAdmin(req, res);
};

const updateAdmin = async (req, res) => {
  const id = req.params.id;
  article = await Article.findByPk(id);
  res.render("updateArticle", { article });
};

const updateArticle = async (req, res) => {
  const id = req.params.id;

  const formidable = require("formidable");

  const form = formidable({
    multiples: true,
    uploadDir: process.cwd() + "/public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const title = fields.title;
    const content = fields.content;
    const seccion = fields.seccion;
    const author = fields.author;
    const email = fields.email;
    let imgDir = files.image.path.split(`\\`);
    imgDir = imgDir.slice(-1).toString();

    console.log(imgDir);
    const article = await Article.findByPk(id);

    await article.update({
      title: title,
      author: author,
      email: email,
      content: content,
      seccion: seccion,
      image: "/img/" + imgDir,
    });
  });
  showAdmin(req, res);
};

const newArticle = async (req, res) => res.render("newArticle");

const postArticle = async (req, res) => {
  const formidable = require("formidable");

  const form = formidable({
    multiples: true,
    uploadDir: process.cwd() + "/public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const title = fields.title;
    const content = fields.content;
    const seccion = fields.seccion;
    const author = fields.author;
    const email = fields.email;
    let imgDir = files.image.path.split(`\\`);
    imgDir = imgDir.slice(-1).toString();

    console.log(imgDir);

    Article.create({
      title: title,
      content: content,
      image: "/img/" + imgDir,
      authorId: 1,
    });
  });
  res.redirect("/");
};

const apiArticles = async (req, res) => {
  const articles = await Article.findAll({
    limit: 200,
    order: [["createdAt", "DESC"]],
  });
  res.json(articles);
};

module.exports = {
  showAdmin,
  deleteAdmin,
  updateAdmin,
  updateArticle,
  newArticle,
  postArticle,
  apiArticles,
};
