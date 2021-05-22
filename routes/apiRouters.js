const express = require("express");
const apiRoutes = express.Router();
const apiController = require("../controllers/apiController");

apiRoutes.get("/api/articles", apiController.showAll);
apiRoutes.get("/api/articles/:id", apiController.showArticle);

module.exports = apiRoutes;
