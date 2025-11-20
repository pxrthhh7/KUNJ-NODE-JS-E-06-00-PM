const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const app = express()
const authModel = require("./Models/Auth")
const productModel = require("./Models/Product")

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/Demo")

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body.user

    if (!name || !email || !password) {
        res.json({ message: "All fields are required!" });
    }

    const existingUser = await authModel.findOne({ email })

    if (existingUser) {
        res.json({ message: "User already exist !" })
    }
    else {

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await authModel.create({ name, email, password: hashedPassword })
        newUser.save()
        res.json({ message: "User Created !" })
    }
})

app.post("/login", async (req, res) => {

    const sAdminEmail = "sadmin@gmail.com"
    const sAdminPassword = "sAdmin@123"

    const { email, password } = req.body

    if (!email || !password) {
        res.json({ message: "All fields are required!" });
    }

    if (email === sAdminEmail && password === sAdminPassword) {
        const superToken = await jwt.sign({ id: 1001 }, "demo@rnw", { expiresIn: "1h" })
        res.json({ message: "Super Admin Loged in !", superToken })
    }
    else {
        const existingUser = await authModel.findOne({ email })

        if (!existingUser) {
            res.json({ message: "User not exist !" })
        }
        else if (existingUser.role == "Admin") {

            const comparedPass = await bcrypt.compare(password, existingUser.password)

            if (comparedPass) {
                const userName = existingUser.name
                const adminToken = await jwt.sign({ id: existingUser._id }, "demo@rnw", { expiresIn: "1h" })
                res.json({ message: "Admin LogedIn !", adminToken, userName })
            }
            else {
                res.json({ message: "Email and Password Does not match !" })
            }

        }
        else {
            const comparedPass = await bcrypt.compare(password, existingUser.password)

            if (comparedPass) {
                const userName = existingUser.name
                const token = await jwt.sign({ id: existingUser._id }, "demo@rnw", { expiresIn: "1h" })
                res.json({ message: `Welcome ${existingUser.name}`, userName, token })
            }
            else {
                res.json({ message: "Email and Password Does not match !" })
            }
        }
    }
})

app.post("/forget", async (req, res) => {
    const { forgetEmail } = req.body

    const existingUser = await authModel.findOne({ email: forgetEmail })

    if (!existingUser) {
        res.json({ message: "User not exist !" })
    }
    else {
        const createNodeMailer = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "parthhadiyal4242@gmail.com",
                pass: "oholhywrpntuaeju"
            }
        })

        const otp = Math.floor(Math.random() * 1000000)

        createNodeMailer.sendMail({
            from: "parthhadiyal4242@gmail.com",
            to: forgetEmail,
            subject: "Reset Password OTP !",
            text: `Your OTP-(One Time Password) For Reset Password is ${otp}`
        })

        existingUser.otp = otp
        existingUser.save()

        let flag = false

        if (existingUser.otp) {
            flag = true
        }
        else {
            flag = false
        }
        res.json({ message: "OTP Sended !", flag, forgetEmail })
    }


})

app.post("/otpverify", async (req, res) => {
    const { otp, forgetEmail } = req.body

    const existingUser = await authModel.findOne({ email: forgetEmail })

    let flag = null

    if (existingUser.otp == otp) {
        flag = true
        res.json({ message: "You can change your password !", flag })
    }
    else {
        flag = false
        res.json({ message: "Invalid OTP !", flag })
    }
})

app.post("/resetpassword", async (req, res) => {
    const { password, forgetEmail } = req.body

    const existingUser = await authModel.findOne({ email: forgetEmail })

    let flag = null

    if (existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10)

        existingUser.password = hashedPassword
        existingUser.save()
        flag = true

        res.json({ message: "Password Updated !", flag })
    }
    else {
        flag = false
        res.json({ message: "Invalid !", flag })
    }

})

app.get("/superAdmin", async (req, res) => {
    const allUsers = await authModel.find();
    res.json({ message: "User Fetched !", allUsers })
})

app.post("/superAdmin", async (req, res) => {
    const { email, newRole } = req.body

    const existingUser = await authModel.findOne({ email })

    if (existingUser) {
        existingUser.role = newRole
        existingUser.save()
        res.json({ message: "Role Changed !" })
    }

})

app.delete("/superAdmin", async (req, res) => {
    const { userId } = req.body

    await authModel.findByIdAndDelete(userId)
    res.json({ message: "User Deleted !" })

})

app.get("/admin", async (req, res) => {
    const allUsers = await authModel.find();
    res.json({ message: "User Fetched !", allUsers })
})

app.post("/addProduct", async (req, res) => {
    const { name, price, description } = req.body.product
    const {imageUrl} = req.body

    console.log(imageUrl)

    const newProduct = await productModel.create({
        productName: name,
        productDescription: description,
        productPrice: price , 
        productImageUrl : imageUrl
    })
    newProduct.save()
    res.json({ message: "Product Added !" })
})

app.get("/productList", async (req, res) => {
    const products = await productModel.find()

    res.json({ message: "Product Fetched !", products })
})

app.delete("/deleteProduct", async (req, res) => {
    const { id } = req.body

    await productModel.findByIdAndDelete(id)
    res.json({ message: "Product Deleted !" })
})

app.post("/editProduct", async (req, res) => {
    const { id } = req.body
    const { name, price, description } = req.body.product

    // Validate
    if (!id || !name || !price || !description) {
        return res.status(400).json({ message: "Missing required fields!" });
    }

    const updated = await productModel.findByIdAndUpdate(
        id,
        {
            productName: name,
            productPrice: price,
            productDescription: description
        },
        { new: true }
    )

    if (!updated) {
        return res.json({ message: "Product not found!" });
    }

    res.json({
        message: "Product Edited Successfully",
        updatedProduct: updated
    });

})

app.listen(8080, () => {
    console.log("Server is running...");

})