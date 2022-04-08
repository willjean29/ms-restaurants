const OrderService = require("../services/order.service");
const { PublishRecipeEvent } = require("../utils");
module.exports = (app) => {
  const service = new OrderService();
  app.post("/", async (req, res, next) => {
    try {
      await PublishRecipeEvent(req.body.payload);
      res.json({ msg: "Order Creada Correctamente" });
    } catch (error) {
      next(error);
    }
  });

  app.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.GetOrderById(id);
      return res.json({
        order,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get("/", async (req, res, next) => {
    try {
      const orders = await service.GetAllOrder();
      return res.json({
        orders,
      });
    } catch (error) {
      next(error);
    }
  });
};
