const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  items: [{ type: String }],
  status: {
    type: String,
    enum: ["IN-PROGRESS", "COMPLETE"],
    default: "IN-PROGRESS",
  },
});

const orderModel = mongoose.model("ORDER", orderSchema);

module.exports = orderModel;