const blogModel = require("./blog.model");
async function getAllBlog() {
  try {
    const result = await blogModel.find();
    return result;
  } catch (error) {
    console.log("Loi", error);
    throw error;
  }
}

// them blog

async function createBlog(body) {
  try {
    const { name, image, description } = body;

    // Tạo sản phẩm mới
    const newBlog = new blogModel({
      name,
      description,
      image,
    });
    // Lưu vào cơ sở dữ liệu
    const result = await newBlog.save();
    return result;
  } catch (error) {
    console.log("Lỗi", error);
    throw error;
  }
}

async function updateById(id, body) {
  try {
    const blog = blogModel.findById(id);
    if (!blog) {
      throw new Error("khong tim thay blog");
    }
    const { name, image, description } = body;

    const result = await blogModel.findByIdAndUpdate(
      id,
      { name, image, description },
      { new: true }
    );
    return result;
  } catch (error) {
    console.log("Loi update", error);
    throw error;
  }
}

// xoa blog theo id
async function deleteBlog(id) {
  try {
    const result = await blogModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log("Lỗi xóa blog", error);
    throw error;
  }
}

async function getBlogById(blogId) {
  try {
    const blogs = await blogModel.findById(blogId);
    if (!blogs) {
      throw new Error("Không tìm thấy blog");
    }
    return blogs;
  } catch (error) {
    console.log("Loi", error);
    throw error;
  }
}
module.exports = { getAllBlog, createBlog, deleteBlog, updateById, getBlogById };
