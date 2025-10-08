const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authModel = require("./Models/user")
const productModel = require("./Models/product")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/Demo")

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body
    const user = await authModel.create({ name, email, password })
    user.save()
    res.json({ message: "User Added !" })
})

app.post("/productadd", async (req, res) => {
    const { productName, productPrice } = req.body

    const product = await productModel.create({ productName, productPrice })
    product.save()
    res.json({ message: "Product Added !" })
})

app.listen(8080, () => {
    console.log("Server is running...")
})