"use strict";

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      articleTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { tableName: "comments" }
  );

  return Comment;
};
