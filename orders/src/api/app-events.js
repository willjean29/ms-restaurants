const OrderService = require("../services/order.service");
module.exports = (app) => {
  app.use("/app-events", (req, res, next) => {
    const service = new OrderService();
    const { payload } = req.body;
    console.log("====================== Order Service Recoved Events =====================");
    console.log({ payload });
    service.SubscribeEvents(payload);
    return res.status(201).json(payload);
  });
};
