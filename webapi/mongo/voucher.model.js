// ket noi collection users
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const voucherSchema = new Schema({
  code: { type: String, required: true, unique: true }, // Mã voucher, ví dụ: "FOODI10".
  discountPercentage: { type: Number, required: true }, // discountPercentage: Phần trăm giảm giá, ví dụ: 10 cho 10%.
  validFrom: { type: Date, required: true }, //validFrom: Ngày bắt đầu hiệu lực của voucher.
  validTo: { type: Date, required: true }, // Ngày hết hiệu lực của voucher.
  maxUses: { type: Number, required: true }, //Số lần sử dụng tối đa của voucher.
  currentUses: { type: Number, default: 0 }, // Số lần voucher đã được sử dụng.
  status: { type: String, enum: ["active", "expired", "used"], default: "active" }, // Trạng thái của voucher (ví dụ: active, expired, used).
});
module.exports = mongoose.models.vouchers || mongoose.model("vouchers", voucherSchema);
