var express = require("express");
var router = express.Router();
const userController = require("../mongo/users.controller");
const upload = require("../helper/upload");
// http://localhost:3000/users

router.get("/", async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    return res.status(200).json({ Users: users });
  } catch (error) {
    console.log("Loi");
    return res.status(500).json({ mess: error });
  }
});

// http://localhost:3000/users/register

// api đăng ký

router.post("/register", async (req, res) => {
  try {
    const body = req.body;
    const result = await userController.register(body);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi thêm người dùng mới", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
});
// http://localhost:3000/users/login
// api dang nhap
router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const result = await userController.login(body);
    return res.status(200).json(result);
  } catch (error) {
    console.log("loi dang nhap", error);
    return res.status(500).json({ mess: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userDel = await userController.remove(id);
    return res.status(200).json({ userDelete: userDel });
  } catch (error) {
    console.log("loi xoa sp theo id", error);
    return res.status(500).json({ mess: error });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    if (req.file && req.file.originalname) {
      body.image = req.file.originalname;
    }
    // Gọi hàm cập nhật sản phẩm từ controller và truyền vào id và body
    const profileUpdate = await userController.updateUserById(id, body);
    // Trả về kết quả cập nhật sản phẩm
    return res.status(200).json({ ProfileUpdate: profileUpdate });
  } catch (error) {
    // Xử lý lỗi nếu có
    console.log("Lỗi cập nhật profile theo id", error);
    return res.status(500).json({ mess: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const profileId = req.params.id;
    const profile = await userController.getProfileById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/admin/:email", userController.getAdmin);
router.patch("/admin/:id", userController.makeAdmin);

module.exports = router;
