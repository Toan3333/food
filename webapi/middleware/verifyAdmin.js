const jwt = require("jsonwebtoken");
const usersModel = require("../mongo/users.model");

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };

  const user = await usersModel.findOne(query);
  const isAdmin = user?.role == "admin";

  if (!isAdmin) {
    return res.status(403).send({ message: "forbidden access!" });
  }

  next();
};

module.exports = verifyAdmin;