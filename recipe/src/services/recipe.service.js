const { RecipeRepository } = require("../database");
const { PublisStoreEvent } = require("../utils");
const { APIError, BadRequestError, STATUS_CODES } = require("../utils/app-errors");

// All Business logic will be here
class RecipeService {
  constructor() {
    this.repository = new RecipeRepository();
  }

  async AddRecipe(recipeDto) {
    try {
      const recipe = await this.repository.CreateRecipe(recipeDto);
      return recipe;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Add Recipe");
    }
  }

  async GetRecipeById(id) {
    try {
      const recipe = await this.repository.FindRecipeById(id);
      return recipe;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Recipe");
    }
  }

  async GetAllRecipe() {
    try {
      const recipes = await this.repository.FindAllRecipe();
      return recipes;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get All Recipe");
    }
  }

  async GetRecipeRandom() {
    try {
      const recipe = await this.repository.FindRecipeRandom();
      console.log(recipe);
      PublisStoreEvent({ event: "PREPARED_RECIPE", data: recipe });
      return recipe;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Recipe Random");
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;
    switch (event) {
      case "ADD_ORDER_RECIPE":
        this.GetRecipeRandom();
        break;
      default:
        break;
    }
  }
}

module.exports = RecipeService;
