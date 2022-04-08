const axios = require("axios");
//Utility functions

module.exports.PublisOrdersEvent = async (payload) => {
  axios.post("http://gateway:8000/orders/app-events", {
    payload,
  });
};
