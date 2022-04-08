const { StoreRepository } = require("../database");
const { PublisOrdersEvent } = require("../utils");
const { APIError, BadRequestError, STATUS_CODES } = require("../utils/app-errors");

// All Business logic will be here
class StoreService {
  constructor() {
    this.repository = new StoreRepository();
  }

  async AddIngredient(ingredientDto) {
    try {
      const ingredient = this.repository.CreateIngredient(ingredientDto);
      return ingredient;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Register Ingredient");
    }
  }

  async GetIngredientById(id) {
    try {
      const ingredient = await this.repository.FindIngredientById(id);
      return ingredient;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Ingredient");
    }
  }

  async GetAllIngredient() {
    try {
      const ingredients = await this.repository.FindAllIngredient();
      return ingredients;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find All Ingredient");
    }
  }

  async AddShopping(ingredient) {
    try {
      const shopping = await this.repository.RegisterShopping(ingredient);
      return shopping;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Register Shopping");
    }
  }

  async GetShoppingById(id) {
    try {
      const shopping = await this.repository.FindShoppingById(id);
      return shopping;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Shopping");
    }
  }

  async GetAllShopping() {
    try {
      const shoppings = await this.repository.FindAllShoping();
      return shoppings;
    } catch (error) {
      console.log({ error });
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get All Shopping");
    }
  }

  async PreparedRecipe(data) {
    // console.log({ data });
    await this.repository.GetIngredientForRecipe(data);
    PublisOrdersEvent({ event: "ADD_ORDER", data });
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;
    switch (event) {
      case "PREPARED_RECIPE":
        this.PreparedRecipe(data);
        break;
      default:
        break;
    }
  }
}

module.exports = StoreService;
