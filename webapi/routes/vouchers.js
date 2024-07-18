var express = require("express");
var router = express.Router();
const voucherController = require("../mongo/voucher.controller");

router.get("/", async (req, res) => {
  try {
    const vouchers = await voucherController.getAllVoucher();
    return res.status(200).json({ Vouchers: vouchers });
  } catch (error) {
    console.log("Loi");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const voucherDel = await voucherController.deleteVoucher(id);
    return res.status(200).json({ VoucherDelete: voucherDel });
  } catch (error) {
    console.log("loi xoa voucher theo id", error);
    return res.status(500).json({ mess: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const result = await voucherController.createVoucher(body);
    return res.status(200).json({ NewVoucher: result });
  } catch (error) {
    console.log("Lỗi thêm voucher mới", error);
    res.status(500).json({ mess: "lỗi" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // Gọi hàm cập nhật sản phẩm từ controller và truyền vào id và body
    const voucherUpdate = await voucherController.updateVoucher(id, body);
    // Trả về kết quả cập nhật sản phẩm
    return res.status(200).json({ VoucherUpdate: voucherUpdate });
  } catch (error) {
    // Xử lý lỗi nếu có
    console.log("Lỗi cập nhật voucher theo id", error);
    return res.status(500).json({ mess: error });
  }
});

// Áp dụng voucher
router.post("/apply", async (req, res) => {
  try {
    const { code, totalPrice } = req.body;
    const result = await voucherController.applyVoucher(code, totalPrice);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
