const axios = require("axios");
const { OrderModel } = require("../models");
const { APIError, BadRequestError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class OrderRepository {
  async CreateOrder(orderDto) {
    try {
      const order = new OrderModel(orderDto);
      await order.save();
      return order;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Create Order");
    }
  }

  async FindOrderById(id) {
    try {
      const order = await OrderModel.findById(id);
      return order;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Order");
    }
  }

  async FindAllOrder() {
    try {
      const orders = await OrderModel.find({}).sort({ createdAt: -1 });
      return orders;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find All Order");
    }
  }
}

module.exports = OrderRepository;
