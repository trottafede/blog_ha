const adminRoutes = require("./adminRoutes");
const publicRoutes = require("./publicRoutes");
const apiRoutes = require("./apiRouters");

module.exports = (app) => {
  app.use(publicRoutes);
  app.use(apiRoutes);
  app.use("/admin", adminRoutes);
};
