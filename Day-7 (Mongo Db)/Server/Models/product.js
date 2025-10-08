const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number
})

const productModel = mongoose.model("products", productSchema)

module.exports = productModel