const express = require('express');
const { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense } = require('../middleware/expenseMiddleware');
const auth = require('../middleware/jwtVerify');
const expenseRouter = express.Router();

expenseRouter.post('/createExpense', auth, createExpense);
expenseRouter.get('/getExpenses', auth, getExpenses);
expenseRouter.get('/getExpenseById/:id', auth, getExpenseById);
expenseRouter.put('/updateExpense/:id', auth, updateExpense);
expenseRouter.delete('/deleteExpense/:id', auth, deleteExpense);

module.exports = expenseRouter;
