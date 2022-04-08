const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        qty: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("recipe", RecipeSchema);
