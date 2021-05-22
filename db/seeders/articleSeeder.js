const faker = require("faker");
const { Article, Author, Comment } = require("..");

faker.locale = "es";

module.exports = async () => {
  const articles = [];
  const authors = [];
  const comments = [];

  for (let i = 0; i < 100; i++) {
    authors.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      author: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    articles.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(50),
      image: faker.internet.avatar(),
      authorId: 1,
    });

    comments.push({
      articleTitle: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(10),
      articleId: 1,
    });
  }

  await Author.bulkCreate(authors);
  await Article.bulkCreate(articles);
  await Comment.bulkCreate(comments);
  console.log("[Database] Se corrió el seeder de Articles.");
};
