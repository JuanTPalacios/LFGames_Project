const express = require("express");
const authMiddleWare = require("../Middlewares/authMiddleware");
const userController = require('../controllers/userController')
const router = express.Router();

router.patch("/changeInfo", authMiddleWare, userController.changeUserNameOrEmail );
// get user, change endpoint here,

module.exports = router;
