
const express = require("express");
const authController = require("./auth.controller");
const authMiddleware = require("./auth.middleware.js");

const router = express.Router();

router.post("/signup", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.get("/me", authMiddleware, authController.getMe);

// router.post("/refresh", authController.refresh);




module.exports = router;