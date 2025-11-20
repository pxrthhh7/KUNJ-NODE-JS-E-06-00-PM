const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName : String,
    productDescription : String,
    productPrice : Number , 
    productImageUrl : String
})

const productModel = mongoose.model("products",productSchema)

module.exports = productModel