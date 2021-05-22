"use strict";

const { Sequelize, Model, DataTypes } = require("sequelize");
const ArticleModel = require("./models/Article.js");
const AuthorModel = require("./models/Author.js");
const CommentModel = require("./models/Comment.js");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    logging: false,
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
  }
);

const Article = ArticleModel(sequelize, Sequelize);
const Author = AuthorModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);

Article.belongsTo(Author, { onDelete: "cascade" });
Author.hasMany(Article);

Comment.belongsTo(Article, { onDelete: "cascade" });
Article.hasMany(Comment);

module.exports = {
  sequelize,
  Sequelize,
  Article,
  Author,
  Comment,
};
