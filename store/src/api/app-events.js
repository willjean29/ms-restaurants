const StoreService = require("../services/store.service");
module.exports = (app) => {
  app.use("/app-events", (req, res, next) => {
    const service = new StoreService();
    const { payload } = req.body;
    console.log("====================== Store Service Recoved Events =====================");
    console.log({ payload });
    service.SubscribeEvents(payload);
    return res.status(201).json(payload);
  });
};
