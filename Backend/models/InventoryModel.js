const mongoose = require("mongoose")

const inventorySchema = mongoose.Schema({
    product_name: {
        type: String,
        required: [true, "Please add a product name"],
      },

    product_image: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png",
      },

    product_catagory: {
        type: String,
        default: "+234",
      },

    product_qty: {
        type: String,
        default: "+234",
      },

    product_discription: {
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        default: "bio",
      },



    


});

const Inventory = mongoose.model("Inventory", inventorySchema)
module.exports = Inventory;