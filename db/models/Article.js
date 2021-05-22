"use strict";

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "article",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { tableName: "articles" }
  );

  return Article;
};
