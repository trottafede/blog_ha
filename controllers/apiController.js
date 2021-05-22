const { Article, Author, Comment } = require("../db");

const showAll = async (req, res) => {
  const articles = await Article.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(articles);
};

const showArticle = async (req, res) => {
  const id = req.params.id;
  const articleInfo = await Article.findByPk(id);

  const authorInfo = await Author.findByPk(articleInfo.authorId);
  const commentInfo = await Comment.findAll({
    where: { articleId: articleInfo.authorId },
  });
  res.json({ articleInfo, authorInfo, commentInfo });
};

module.exports = {
  showAll,
  showArticle,
};
