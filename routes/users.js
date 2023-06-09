const express = require("express");
const UserController = require("../controllers/UserController");
const {authentication, isAdmin, dataAuthentication} = require('../middlewares/authentication');
const router = express.Router();
const { uploadUserImage } = require("../middlewares/upload")

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/updateProfile", authentication, uploadUserImage.single("image"), UserController.updateProfile)
router.put("/addInterests", authentication, UserController.addInterests)
router.get("/confirm/:email", UserController.confirm);
router.get("/getAll", authentication, UserController.getAll)
router.get("/getById/:_id",authentication, UserController.getById);
router.get("/searchByName/:name", authentication, UserController.searchByName)
router.get('/recoverPassword/:email',UserController.recoverPassword)
router.put("/resetPassword/:recoverToken", UserController.resetPassword)
router.delete('/logout',authentication, UserController.logout)



//PARA DATA SCIENCE
router.get('/dataGetAll', dataAuthentication, UserController.dataGetAll)


module.exports = router;

