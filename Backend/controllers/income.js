const IncomeSchema= require("../models/incomeModel")


const addIncome = async (req, res) => {
    const {title, amount, category,project, description,date}  = req.body


    const income = IncomeSchema({
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
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

const getIncomes = async (req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

const deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}
exports.addIncome = addIncome;
exports.getIncomes = getIncomes;
exports.deleteIncome = deleteIncome;