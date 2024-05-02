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

const getIncomeByID = async(req,res,next)=>{
    const { id } = req.params; 
    let income;

    try{
        income = await IncomeSchema.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!income){
        return res.status(404).json({message:"Income not found."})
    }
    return res.status(200).json({income})


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



const updateIncome = async (req, res) => {
    const { id } = req.params; // Get the income ID from the request parameters
    const { title, amount, category, project, description, date } = req.body; // Get updated income details from request body

    try {
        // Check if the income ID is provided
        if (!id) {
            return res.status(400).json({ message: 'Income ID is required' });
        }

        // Find the income by ID and update it with the provided details
        const updatedIncome = await IncomeSchema.findByIdAndUpdate(id, {
            title,
            amount,
            category,
            project,
            description,
            date
        }, { new: true }); // Set { new: true } to return the updated income

        // Check if the income was found and updated successfully
        if (!updatedIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }

        // Respond with a success message and the updated income
        res.status(200).json({ message: 'Income updated', income: updatedIncome });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};




exports.addIncome = addIncome;
exports.getIncomes = getIncomes;
exports.deleteIncome = deleteIncome;
exports.updateIncome = updateIncome;
exports.getIncomeByID = getIncomeByID;