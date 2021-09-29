const express = require("express");
const mongoose = require("mongoose");
const authMiddleWare = require("../Middlewares/authMiddleware");
const userController = require('../controllers/userController')
const router = express.Router();

router.patch("/changeInfo", authMiddleWare, userController.changeUserNameOrEmail );


module.exports = router;
