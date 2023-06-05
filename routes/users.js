const express = require("express");
const UserController = require("../controllers/UserController");
const {authentication, isAdmin} = require('../middlewares/authentication');
const router = express.Router();
const { uploadUserImage } = require("../middlewares/upload")


router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/updateProfile", authentication, uploadUserImage.single("image"), UserController.updateProfile)
router.post("/addInterests", authentication, UserController.addInterests)
router.get("/confirm/:email", UserController.confirm);
module.exports = router;

