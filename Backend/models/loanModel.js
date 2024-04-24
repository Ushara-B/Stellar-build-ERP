const mongoose = require("mongoose");
const Schema = mongoose.Schema; // add karapu mongoose eka schema ekata assign kara

//input ganna details okkoma call karanne schema kiyla hadana function eka athule

const loanSchema = new Schema({

    loanId:{ 
        type: String, // dataType
        required:true,//validate
    },

    BorrowersName:{//total amount of the loan
        type: String, // dataType
        required:true,//validate
    },

    LoanAmount:{//total amount of the loan
        type: String, // dataType
        required:true,//validate
    },

    InterestRate:{// interest rate of the loan
        type: String, // dataType
        required:true,//validate
    },

    Period:{ // loan period
        type: String, // dataType
        required:true,//validate
    },

    StartingDate:{ // starting date of the loan
        type: Date, // dataType
        required:true,//validate
    },

    EndDate:{  // Ending date of the loan
        type: Date, // dataType
        required:true,//validate
    },

    TotalInstallments:{ 
        type: String, // dataType
        required:true,//validate
    },

    PaidInstallments:{
        type: String, // dataType
        required:true,//validate
    },

    Notes:{
        type: String, // dataType
        required:true,//validate
    },

    LoanStatus:{  // is this loan is already paid or active 
        type: String, // dataType
        required:true,//validate
    }

});

module.exports = mongoose.model(
    "loanModel", //filename
    loanSchema // funtion name
);