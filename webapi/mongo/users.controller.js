const usersModel = require("./users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// get all users

async function getAllUsers() {
  try {
    const result = await usersModel.find();
    return result;
  } catch (error) {
    console.log("Loi", error);
    throw error;
  }
}

// post a new user
// const createUser = async (req, res) => {
//   const user = req.body;
//   const query = { email: user.email };
//   try {
//     const existingUser = await usersModel.findOne(query);
//     if (existingUser) {
//       return res.status(302).json({ message: "User already exists!" });
//     }
//     const result = await usersModel.create(user);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// get admin
const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  try {
    const user = await usersModel.findOne(query);
    // console.log(user)
    if (email !== req.decoded.email) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    let admin = false;
    if (user) {
      admin = user?.role === "admin";
    }
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// make admin of a user
const makeAdmin = async (req, res) => {
  const userId = req.params.id;
  const { name, email, photoURL, role } = req.body;
  try {
    const updatedUser = await usersModel.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function register(body) {
  try {
    // lay du lieu
    const { name, email, pass, role } = body;
    // kiem tra email da dang ky chua
    let user = await usersModel.findOne({ email: email });
    if (user) {
      throw new Error("Email đã tồn tại");
    }
    // tạo hash pass
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt);
    // tao user moi
    user = new usersModel({ name, email, pass: hash, role: role || "user" });
    //luu db
    const result = await user.save();
    return result;
  } catch (error) {
    console.log("Loi dang ky", error);
    throw error;
  }
}

// async function login(body) {
//   try {
//     const { email, pass } = body;

//     // Kiểm tra xem người dùng có tồn tại không
//     const user = await usersModel.findOne({ email: email });
//     if (!user) {
//       throw new Error("Email không tồn tại");
//     }

//     // Kiểm tra mật khẩu
//     const isPasswordValid = await bcript.compare(pass, user.pass);
//     if (!isPasswordValid) {
//       throw new Error("Mật khẩu không chính xác");
//     }

//     // Xóa trường mật khẩu và tạo token
//     delete user._doc.pass;
//     const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, "anhtoan", {
//       expiresIn: 1 * 1 * 60 * 60, // Example: token hết hạn sau 7 ngày
//     });

//     // Trả về thông tin người dùng và token
//     return { user, token };
//   } catch (error) {
//     console.error("Lỗi đăng nhập:", error.message);
//     throw error;
//   }
// }

// xoa user theo id
async function remove(id) {
  try {
    const result = await usersModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log("Lỗi xóa user", error);
    throw error;
  }
}

async function login(body) {
  try {
    // Lấy dữ liệu đăng nhập từ body
    const { email, pass } = body;

    // Kiểm tra email
    let user = await usersModel.findOne({ email: email });
    if (!user) {
      throw new Error("Email không tồn tại");
    }

    // Kiểm tra xem mật khẩu đã băm có tồn tại không
    if (!user.pass) {
      throw new Error("Không thể tìm thấy mật khẩu đã băm");
    }

    // Kiểm tra mật khẩu
    const checkpass = bcrypt.compareSync(pass, user.pass); // Ensure user.pass is defined
    if (!checkpass) {
      throw new Error("Mật khẩu không chính xác");
    }

    // Kiểm tra và thêm vai trò vào đối tượng người dùng
    const role = user.role; // Vai trò của người dùng
    // delete user._doc.pass; // Xóa trường mật khẩu
    const token = jwt.sign({ _id: user._id, email: user.email, role: role }, "anhtoan", {
      expiresIn: "30d",
    });

    // Thêm thông tin token vào đối tượng người dùng
    user = { ...user._doc, token };

    return user;
  } catch (error) {
    console.log("Loi dang nhap", error);
    throw error;
  }
}

async function updateUserById(id, body) {
  try {
    const profile = usersModel.findById(id);
    if (!profile) {
      throw new Error("khong tim thay san pham");
    }
    const { name, photoURL } = body;

    const result = await usersModel.findByIdAndUpdate(id, { name, photoURL }, { new: true });
    return result;
  } catch (error) {
    console.log("Loi update", error);
    throw error;
  }
}

async function getProfileById(productId) {
  try {
    const profiles = await usersModel.findById(productId);
    if (!profiles) {
      throw new Error("Không tìm thấy profile");
    }
    return profiles;
  } catch (error) {
    console.log("Loi", error);
    throw error;
  }
}

module.exports = {
  getProfileById,
  updateUserById,
  getAllUsers,
  register,
  remove,
  login,
  getAdmin,
  makeAdmin,
};
