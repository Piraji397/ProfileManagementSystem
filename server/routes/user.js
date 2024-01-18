const express = require("express");
const router = express.Router();

const { signup, signin } = require("../controllers/Auth");

router.post("/login", signin);
router.post("/register", signup);

module.exports = router;
