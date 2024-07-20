const express = require("express");
const { signup, signin, logout, userProfile } = require("../controllers/auth");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

//  /api/signup
router.post("/signup", signup);
// /api/signin
router.post("/signin", signin);
// /api/logout
router.get("/logout", logout);
// /api/me
router.get("/me", isAuthenticated, userProfile);

module.exports = router;
