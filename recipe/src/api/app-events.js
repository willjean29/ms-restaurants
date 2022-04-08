const RecipeService = require("../services/recipe.service");
module.exports = (app) => {
  app.use("/app-events", (req, res, next) => {
    const service = new RecipeService();
    const { payload } = req.body;
    service.SubscribeEvents(payload);
    console.log("====================== Recipe Service Recoved Events =====================");
    console.log(payload);
    return res.status(201).json(payload);
  });
};
