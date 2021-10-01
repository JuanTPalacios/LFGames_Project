const express = require("express");
const authController = require("../controllers/AuthController/authController");
const authMiddleWare = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/signin", authController.signIn);
router.get("/signout", authMiddleWare, authController.signOutUser);

// move getUser to userRoutes

module.exports = router;
