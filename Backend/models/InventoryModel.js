const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },

    category: {
        type: String,
        required: true,
        trim: true,
      }, 

    quantity: {
        type: String,
        required: true,
        trim: true,
      },

    discription: {
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        required: true, 
        trim: true,
      },

    suppliers: {
        type: String,
        required: true,
        trim: true,
      },
 },
      {
        timestamps: true,
      },

);

module.exports = mongoose.model(
  "Inventory",
   inventorySchema
   );
