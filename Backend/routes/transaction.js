const { addIncome, getIncomes,deleteIncome } = require('../controllers/income');
const { addExpense, getExpenses,deleteExpense } = require('../controllers/expenses');
const router = require('express').Router();

// Define routes for adding income and getting incomes
router.post('/add-income',addIncome)
      .get('/get-incomes',getIncomes)
      .delete('/delete-income/:id',deleteIncome)
     .post('/add-expense',addExpense)
      .get('/get-expenses',getExpenses)
      .delete('/delete-expense/:id',deleteExpense)
      
     
// Define routes for adding expense and getting expenses

module.exports = router;
