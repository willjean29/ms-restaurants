const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StoreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ingredient", StoreSchema);
