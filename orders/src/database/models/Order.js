const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
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
    status: {
      type: String,
      enum: ["REQUEST", "PREPARE", "READY"],
      default: "REQUEST",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", OrderSchema);
