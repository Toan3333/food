const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  orderDate: { type: String, required: true },
  orderDateTime: { type: String, required: true },
  orderName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  products: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.models.orders || mongoose.model("orders", orderSchema);
