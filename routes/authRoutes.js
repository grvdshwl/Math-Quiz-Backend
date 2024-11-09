const express = require("express");
const {
  signUp,
  login,
  getUserDetails,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/user/:email", getUserDetails);
module.exports = router;
