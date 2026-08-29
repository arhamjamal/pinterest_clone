
const express = require("express");
const authController = require("./auth.controller");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.getMe);
router.post("/refresh", authController.refresh);

module.exports = router;