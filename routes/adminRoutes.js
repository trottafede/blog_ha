const express = require("express");
const adminRoutes = express.Router();
const adminController = require("../controllers/adminController.js");

const logedIn = require("../middlewares/loginControl");
adminRoutes.use(logedIn);

adminRoutes.get("", adminController.showAdmin);
adminRoutes.get("/delete/:id", adminController.deleteAdmin);

adminRoutes.get("/newArticle", adminController.newArticle);
adminRoutes.post("/newArticle", adminController.postArticle);

adminRoutes.get("/update/:id", adminController.updateAdmin);
adminRoutes.post("/update/:id", adminController.updateArticle);

adminRoutes.get("/api/articulos", adminController.apiArticles);

module.exports = adminRoutes;
