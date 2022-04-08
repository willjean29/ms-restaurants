const RecipeService = require("../services/recipe.service");

module.exports = (app) => {
  const service = new RecipeService();

  app.post("/", async (req, res, next) => {
    try {
      const recipe = await service.AddRecipe(req.body);
      return res.json({
        recipe,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const recipe = await service.GetRecipeById(id);
      return res.json({
        recipe,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get("/", async (req, res, next) => {
    try {
      const recipes = await service.GetAllRecipe();
      return res.json({
        recipes,
      });
    } catch (error) {
      next(error);
    }
  });
};
