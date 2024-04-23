
const ExpenseSchema= require("../models/ExpenseModel")

const addExpense = async (req, res) => {
    const {title, amount, category,project, description, date}  = req.body

    const income = ExpenseSchema({
        title,
        amount,
        category,
        project,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date || !project){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.json({ massage: error });
    }

    console.log(income)
}

const getExpenses = async (req, res) =>{
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

const deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}

const updateExpense = async (req, res) => {
    const { id } = req.params; // Get the income ID from the request parameters
    const { title, amount, category, project, description, date } = req.body; // Get updated income details from request body

    try {
        // Check if the income ID is provided
        if (!id) {
            return res.status(400).json({ message: 'Expense ID is required' });
        }

        // Find the income by ID and update it with the provided details
        const updatedExpense = await ExpenseSchema.findByIdAndUpdate(id, {
            title,
            amount,
            category,
            project,
            description,
            date
        }, { new: true }); // Set { new: true } to return the updated income

        // Check if the income was found and updated successfully
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Respond with a success message and the updated income
        res.status(200).json({ message: 'Expense updated', income: updatedExpense });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getExpenseByID = async(req,res,next)=>{
    const { id } = req.params; 
    let expense;

    try{
        expense = await ExpenseSchema.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!expense){
        return res.status(404).json({message:"Income not found."})
    }
    return res.status(200).json({expense})


}

exports.addExpense = addExpense;
exports.getExpenses = getExpenses;
exports.deleteExpense = deleteExpense;
exports.updateExpense = updateExpense;
exports.getExpenseByID = getExpenseByID;