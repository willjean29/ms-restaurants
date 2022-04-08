const { OrderRepository } = require("../database");
const { APIError, BadRequestError, STATUS_CODES } = require("../utils/app-errors");
// const Socket = require("../socket");
// All Business logic will be here
class OrderService {
  constructor() {
    this.repository = new OrderRepository();
  }

  async AddOrder(orderDto) {
    try {
      const order = await this.repository.CreateOrder(orderDto);
      return order;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Add Order");
    }
  }

  async GetOrderById(id) {
    try {
      const order = await this.repository.FindOrderById(id);
      return order;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Order");
    }
  }

  async GetAllOrder() {
    try {
      const orders = await this.repository.FindAllOrder();
      return orders;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find All Order");
    }
  }

  async AddOrderRecipe(data) {
    try {
      const recipe = await this.AddOrder({ name: data.name, ingredients: data.ingredients });

      return recipe;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Add Order Recipe");
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;
    switch (event) {
      case "ADD_ORDER":
        this.AddOrderRecipe(data);
        break;
      default:
        break;
    }
  }
}

module.exports = OrderService;
