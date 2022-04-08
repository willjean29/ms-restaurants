const StoreService = require("../services/store.service");

module.exports = (app) => {
  const service = new StoreService();
  app.get("/list", async (req, res, next) => {
    try {
      const orders = await service.GetAllShopping();
      return res.json({ orders });
    } catch (error) {
      next(error);
    }
  });
  app.post("/", async (req, res, next) => {
    try {
      const ingredient = await service.AddIngredient(req.body);
      return res.json({
        ingredient,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const ingredient = await service.GetIngredientById(id);
      return res.json({ ingredient });
    } catch (error) {
      next(error);
    }
  });

  app.get("/", async (req, res, next) => {
    try {
      const ingredients = await service.GetAllIngredient();
      return res.json({ ingredients });
    } catch (error) {
      next(error);
    }
  });

  app.post("/list", async (req, res, next) => {
    try {
      const order = await service.AddShopping(req.body.ingredient);
      return res.json({ order });
    } catch (error) {
      next(error);
    }
  });

  app.get("/list/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.GetShoppingById(id);
      return res.json({ order });
    } catch (error) {
      next(error);
    }
  });
};
