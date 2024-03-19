const ExpenseSchema= require("../models/ExpenseModel")

exports.addExpense = async (req, res) => {
    const {title, amount, date, category, project,description}  = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        date,
        category,
        project,
       description     
    })

    try {
        //validations
        if(!title || !category || !description || !date || !project ){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await expense.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
        console.error(error.message);

    }

    console.log(expense)
}

exports.getExpenses = async(req,res) => {
    try{
        //fetch income records from the database using the Expenseschema model and sorts them by creation date in descending order. 
        const Expenses = await ExpenseSchema.find().sort({createdAt: -1}) //
        res.status(200).json(expenses);
    }catch(error){
        res.status(400).json({message:'server error'})
    }
}

exports.deleteExpenses = async(req,res) => {
   
        const {id} = req.params;
        ExpenseSchema.findByIdAndDelete(id)
          .then((expense)=>{
            res.status(200).json({message: 'Expense Deleted'})
          })
          .catch((error)=>{
            res.status(500).json({message: 'Server Error'})
          })
    
}
