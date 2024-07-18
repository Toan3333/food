const orderModel = require("./order.model");

async function getAll() {
  try {
    const result = await orderModel.find();
    // const result = await productModel.find().limit(6).sort({ price: 1 });
    // const result = await productModel.find({}, { name: 1, price: 1, quantity: 1 });

    // select name,price,quantity where price < 3.99 or price > 4.99
    // const result = await productModel.find(
    //   {
    //     $or: [{ price: { $lt: 3.99 } }],
    //     $or: [{ price: { $gt: 4.99 } }],
    //   },
    //   { name: 1, price: 1, quantity: 1 }
    // );

    // const result = await productModel.find(
    //   {
    //     name: { $regex: "b", $options: "i" },
    //     // i không phân biệt hoa thường
    //   },
    //   { name: 1, price: 1, quantity: 1 }
    // );

    return result;
  } catch (error) {
    console.log("Loi", error);
    throw error;
  }
}
async function createOrder(body) {
  try {
    // Extract data from the body
    const {
      orderId,
      orderDate,
      orderDateTime,
      orderName,
      phoneNumber,
      address,
      email,
      products,
      totalPrice,
    } = body;

    // Create new order object
    const newOrder = new orderModel({
      orderId,
      orderDate,
      orderDateTime,
      orderName,
      phoneNumber,
      address,
      email,
      products,
      totalPrice,
    });

    // Save order to database
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

async function deleteOrder(id) {
  try {
    const result = await orderModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log("Lỗi xóa đơn hàng", error);
    throw error;
  }
}

async function getOrderById(orderId) {
  try {
    const orders = await orderModel.findById(orderId);
    if (!orders) {
      throw new Error("Không tìm thấy order");
    }
    return orders;
  } catch (error) {
    console.log("Loi", error);
    throw error;
  }
}

module.exports = { createOrder, getAll, deleteOrder, getOrderById };
