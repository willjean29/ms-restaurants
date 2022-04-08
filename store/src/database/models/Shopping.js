const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShoppingSchema = new Schema(
  {
    ingredient: {
      type: Schema.Types.ObjectId,
      ref: "ingredient",
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

module.exports = mongoose.model("shopping", ShoppingSchema);
