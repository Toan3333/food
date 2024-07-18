const voucherModel = require("./voucher.model");

// Lấy tất cả voucher
async function getAllVoucher() {
  try {
    const result = await voucherModel.find();
    return result;
  } catch (error) {
    console.log("Lỗi không lấy được danh sách voucher");
    throw error;
  }
}

// Tạo voucher mới
async function createVoucher(body) {
  try {
    const { code, discountPercentage, validFrom, validTo, maxUses, currentUses, status } = body;

    // Tạo voucher mới
    const newVoucher = new voucherModel({
      code,
      discountPercentage,
      validFrom,
      validTo,
      maxUses,
      currentUses,
      status,
    });
    // Lưu vào cơ sở dữ liệu
    const result = await newVoucher.save();
    return result;
  } catch (error) {
    console.log("Lỗi tạo voucher", error);
    throw error;
  }
}

// Xóa voucher
async function deleteVoucher(id) {
  try {
    const result = await voucherModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log("Lỗi xóa voucher", error);
    throw error;
  }
}

// Cập nhật voucher
async function updateVoucher(id, body) {
  try {
    const result = await voucherModel.findByIdAndUpdate(id, body, { new: true });
    return result;
  } catch (error) {
    console.log("Lỗi cập nhật voucher", error);
    throw error;
  }
}

// Áp dụng voucher
// Áp dụng voucher
// Áp dụng voucher
async function applyVoucher(code, totalPrice) {
  try {
    const voucher = await voucherModel.findOne({ code, status: "active" });

    if (!voucher) {
      throw new Error("Invalid or expired gift card");
    }

    const currentDate = new Date();
    if (currentDate < voucher.validFrom || currentDate > voucher.validTo) {
      throw new Error("Gift card is not valid at this time");
    }

    if (totalPrice < voucher.minPurchaseAmount) {
      throw new Error(`Minimum purchase amount is ${voucher.minPurchaseAmount}`);
    }

    if (voucher.currentUses >= voucher.maxUses) {
      throw new Error("Gift card usage limit reached");
    }

    const discount = totalPrice * (voucher.discountPercentage / 100);
    const discountedPrice = totalPrice - discount;

    // Kiểm tra nếu voucher đã được áp dụng rồi
    if (voucher.currentUses > 0) {
      throw new Error("This gift card has already been applied");
    }

    // Tăng currentUses lên 1 và giảm maxUses xuống 1
    voucher.currentUses += 1;
    voucher.maxUses -= 1;

    // Nếu maxUses giảm xuống 0, thay đổi trạng thái voucher
    if (voucher.maxUses === 0) {
      voucher.status = "inactive";
    }

    await voucher.save();

    return {
      discountedPrice,
      currentUses: voucher.currentUses,
      message: "Gift card applied successfully",
    };
  } catch (error) {
    console.log("Lỗi áp dụng voucher", error);
    throw error;
  }
}

module.exports = {
  getAllVoucher,
  createVoucher,
  deleteVoucher,
  updateVoucher,
  applyVoucher,
};
