const IncomeSchema= require("../models/IncomeModel")

exports.addIncome = async (req, res) => {
    const {title, amount, date, category, project,description}  = req.body

    const income = IncomeSchema({
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
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
        console.error(error.message);

    }

    console.log(income)
}

exports.getIncomes = async(req,res) => {
    try{
        //fetch income records from the database using the IncomeSchema model and sorts them by creation date in descending order. 
        const incomes = await IncomeSchema.find().sort({createdAt: -1}) //
        res.status(200).json(incomes);
    }catch(error){
        res.status(400).json({message:'server error'})
    }
}

exports.deleteIncomes = async(req,res) => {
   
        const {id} = req.params;
        IncomeSchema.findByIdAndDelete(id)
          .then((income)=>{
            res.status(200).json({message: 'Income Deleted'})
          })
          .catch((error)=>{
            res.status(500).json({message: 'Server Error'})
          })
    
}
