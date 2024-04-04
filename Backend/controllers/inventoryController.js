const asyncHandler =require("express-async-handler")




const addProduct= asyncHandler (async (req, res) => {
    const{product_name, product_category, product_qty} = req.body

    //Validation 
    if (!product_name || !product_category || product_qty) {
        res.status(400);
        throw new Error("Please fill in all required fields");
      }
});

module.exports ={
    addProduct,

}