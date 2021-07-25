const express = require("express");
const router = express.Router();
const passport = require('passport');

const { signup, signin, signout, telegramLink, telegramUnlink} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");
const { createBoard } = require('../controllers/board.js')
const { userById } = require("../controllers/user");

router.post("/signup", userSignupValidator, signup, createBoard);
router.post("/signin", passport.authenticate('local'), signin);
router.get("/signout", signout);

router.post("/telegram/disconnect", telegramUnlink);

router.post("/telegram/:userId", telegramLink);

router.param('userId', userById)

module.exports = router;