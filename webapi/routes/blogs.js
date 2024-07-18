var express = require("express");
var router = express.Router();
const blogController = require("../mongo/blog.controller");
const upload = require("../helper/upload");
router.get("/", async (req, res) => {
  try {
    const blog = await blogController.getAllBlog();
    return res.status(200).json({ Blogs: blog });
  } catch (error) {
    console.log("Loi");
    return res.status(500).json({ mess: error });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const body = req.body;
    // Kiểm tra xem req.file có tồn tại không trước khi truy cập thuộc tính originalname
    if (req.file && req.file.originalname) {
      body.image = req.file.originalname;
    }
    const result = await blogController.createBlog(body);
    return res.status(200).json({ NewBlog: result });
  } catch (error) {
    console.log("Lỗi thêm blog mới", error);
    res.status(500).json({ mess: "lỗi" });
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
    const blogUpdate = await blogController.updateById(id, body);
    // Trả về kết quả cập nhật sản phẩm
    return res.status(200).json({ ProductUpdate: blogUpdate });
  } catch (error) {
    // Xử lý lỗi nếu có
    console.log("Lỗi cập nhật blog theo id", error);
    return res.status(500).json({ mess: error });
  }
});

// xoa blog theo id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogDel = await blogController.deleteBlog(id);
    return res.status(200).json({ BlogDelete: blogDel });
  } catch (error) {
    console.log("loi xoa sp theo id", error);
    return res.status(500).json({ mess: error });
  }
});

// chi tiết blog
router.get("/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await blogController.getBlogById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
