const axios = require("axios");

//Utility functions
module.exports.PublishRecipeEvent = async (payload) => {
  axios.post("http://gateway:8000/recipe/app-events", {
    payload,
  });
};
