const axios = require("axios");
const { RecipeModel } = require("../models");
const { APIError, BadRequestError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class RecipeRepository {
  async CreateRecipe(recipeDto) {
    try {
      const recipe = new RecipeModel(recipeDto);
      await recipe.save();
      return recipe;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Create Recipe");
    }
  }

  async FindRecipeById(id) {
    try {
      const recipe = await RecipeModel.findById(id);
      return recipe;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Recipe");
    }
  }

  async FindAllRecipe() {
    try {
      const recipes = await RecipeModel.find({});
      return recipes;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find All Recipe");
    }
  }

  async FindRecipeRandom() {
    try {
      const recipes = await RecipeModel.find({});
      const recipeRandom = recipes[Math.floor(Math.random() * recipes.length)];
      return recipeRandom;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Recipe Random");
    }
  }
}

module.exports = RecipeRepository;
