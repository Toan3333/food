var express = require("express");
var router = express.Router();
const orderController = require("../mongo/order.controller");

// Lấy danh sách đơn hàng
router.get("/", async (req, res) => {
  try {
    const orders = await orderController.getAll();
    return res.status(200).json({ Orders: orders });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Tạo đơn hàng mới

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const result = await orderController.createOrder(body);
    return res.status(200).json({ NewOrder: result });
  } catch (error) {
    console.log("Lỗi thêm sản phẩm mới", error);
    res.status(500).json({ mess: "lỗi" });
  }
});

// xoa order theo id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const orderDel = await orderController.deleteOrder(id);
    return res.status(200).json({ OrderDelete: orderDel });
  } catch (error) {
    console.log("loi xoa order theo id", error);
    return res.status(500).json({ mess: error });
  }
});

// chi tiết order
router.get("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderController.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
