const express = require("express");
const router = express.Router();

const { createExpense, getExpenses, getExpense, updateExpense, delExpense, expenseById, createLabel } = require('../controllers/expense');
const { requireSignin, isAuth } = require("../controllers/auth");
const { setUser } = require("../controllers/user");

router.use(requireSignin, isAuth, setUser);

router.route("/")
    .get(getExpenses)
    .post(createExpense)
    .put(createLabel)


router.route("/:expenseId/")
    .get(getExpense)
    .put(updateExpense)
    .delete(delExpense);


router.param('expenseId', expenseById)

module.exports = router;