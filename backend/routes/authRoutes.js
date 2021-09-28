const express = require("express");
const mongoose = require("mongoose");
const authController = require("../controllers/authController");
const authMiddleWare = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/signout", authMiddleWare, authController.signOutUser);
router.get("/user", authMiddleWare, authController.getUser);

module.exports = router;
