const express = require("express");
const { login, signup, getUser } = require("../controllers/userControllers");

const router = express.Router();

//login user

router.post("/login", login);

//sign up user

router.post("/signup", signup);

//get users
router.get("/", getUser);

module.exports = router;
