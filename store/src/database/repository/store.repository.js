const axios = require("axios");
const { IngredientModel, ShoppingModel } = require("../models");
const { APIError, BadRequestError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class StoreRepository {
  async CreateIngredient(ingredientDto) {
    try {
      const ingredient = new IngredientModel(ingredientDto);
      await ingredient.save();
      return ingredient;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Create Ingredient");
    }
  }

  async FindIngredientById(id) {
    try {
      const ingredient = await IngredientModel.findById(id);
      return ingredient;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Ingredient");
    }
  }

  async FindAllIngredient() {
    try {
      const ingredients = await IngredientModel.find({}).sort({ name: 1 });
      return ingredients;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find All Ingredient");
    }
  }

  async RegisterShopping(name) {
    try {
      const {
        data: { quantitySold },
      } = await axios.get(`https://recruitment.alegra.com/api/farmers-market/buy?ingredient=${name}`);
      if (quantitySold == 0) {
        // throw APIError("API Error", STATUS_CODES.BAD_REQUEST, "Unable to Register Shopping");
        this.RegisterShopping(name);
        return;
      }
      const ingredient = await IngredientModel.findOne({ name: name });
      ingredient.qty += quantitySold;
      await ingredient.save();
      const shopping = new ShoppingModel({
        ingredient: ingredient._id,
        qty: quantitySold,
      });
      await shopping.save();
      return shopping;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Register Shopping");
    }
  }

  async FindShoppingById(id) {
    try {
      const shopping = await ShoppingModel.findById(id);
      return shopping;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Shopping");
    }
  }

  async FindAllShoping() {
    try {
      const shoppings = await ShoppingModel.find({}).populate("ingredient").sort({ createdAt: -1 });
      return shoppings;
    } catch (error) {
      console.log({ error });
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Shopping All");
    }
  }

  async GetIngredientForRecipe(data) {
    try {
      console.log("GetIngredientForRecipe");
      // console.log({ data });
      const ingredients = data.ingredients;
      for (let ingredient of ingredients) {
        await this.UpdateStockIngredient(ingredient);
      }
      return true;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Ingredient");
    }
  }
  async UpdateStockIngredient(ingredient) {
    try {
      console.log({ ingredient });
      const item = await IngredientModel.findOne({ name: ingredient.name });
      console.log({ item });
      if (item.qty < ingredient.qty) {
        // Register Shopping
        const shopping = await this.RegisterShopping(item.name);
        this.UpdateStockIngredient(item);
        return;
      }
      item.qty = item.qty - ingredient.qty;
      await item.save();
      return item;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Update Stock Ingredient");
    }
  }
}

module.exports = StoreRepository;
