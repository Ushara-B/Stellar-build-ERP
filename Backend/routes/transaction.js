const { addIncome, getIncomes,getIncomeByID,deleteIncome, updateIncome } = require('../controllers/income');
const { addExpense, getExpenses,getExpenseByID,updateExpense,deleteExpense } = require('../controllers/expenses');
const router = require('express').Router();

// Define routes for adding income and getting incomes
router.post('/add-income',addIncome)
      .get('/get-incomes',getIncomes)
      .get('/get-income/:id',getIncomeByID)
      .delete('/delete-income/:id',deleteIncome)
      .put('/update-income/:id',updateIncome)
     .post('/add-expense',addExpense)
      .get('/get-expenses',getExpenses)
      .delete('/delete-expense/:id',deleteExpense)
      .put('/update-expense/:id',updateExpense)
      .get('/get-expense/:id',getExpenseByID)
     
// Define routes for adding expense and getting expenses

module.exports = router;
