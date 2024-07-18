var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
// const dbUrl = process.env.DB_URL;

// Khai báo routing
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var categoriesRouter = require("./routes/categories");
var blogsRouter = require("./routes/blogs");
var ordersRouter = require("./routes/orders");
var vouchersRouter = require("./routes/vouchers");
const verifyToken = require("./middleware/veryToken");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors()); // cho phép các domain khác gọi tới api này

// kết nối dbMongo
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Kết nối thành công"))
  .catch((err) => console.log("Thất bại", err));

// jwt authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, "anhtoan", {
    expiresIn: "1hr",
  });
  res.send({ token });
});

// định nghĩa routing
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/blogs", blogsRouter);
app.use("/orders", ordersRouter);
app.use("/vouchers", vouchersRouter);

app.get("/", verifyToken, (req, res) => {
  res.send("Hello Foodi Client Server!");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // gửi phản hồi lỗi dưới dạng JSON
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

module.exports = app;
