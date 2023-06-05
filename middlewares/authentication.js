const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();




const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: payload._id, tokens: token });
    if (!user) {
      return res.status(401).send("Usuario no existe");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Ha habido un problema con el token");
  }
};

const isAdmin = async (req, res, next) => {
  const admins = ["admin", "superadmin"];

  if (!admins.includes(req.user.role)) {
    return res.status(403).send({
      message: "No tienes permisos",
    });
  }

  next();
};

module.exports = { authentication, isAdmin };
