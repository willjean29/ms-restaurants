const axios = require("axios");

//Utility functions

module.exports.PublisStoreEvent = async (payload) => {
  axios.post("http://gateway:8000/store/app-events", {
    payload,
  });
};
