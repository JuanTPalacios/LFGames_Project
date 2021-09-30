const express = require("express");
const authMiddleWare = require("../Middlewares/authMiddleware");
const userController = require('../controllers/userController')
const router = express.Router();

router.patch('/user', authMiddleWare, userController.updateUser);
router.get('/user', authMiddleWare, userController.getUser)
router.post('/user', userController.createUser);
// get user, change endpoint here,

module.exports = router;
