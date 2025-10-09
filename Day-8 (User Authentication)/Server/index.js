const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const app = express()
const authModel = require("./Models/Auth")

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
    const { email, password } = req.body

    if (!email || !password) {
        res.json({ message: "All fields are required!" });
    }

    const existingUser = await authModel.findOne({ email })

    if (!existingUser) {
        res.json({ message: "User not exist !" })
    }
    else {
        const comparedPass = await bcrypt.compare(password,existingUser.password)
        const userName = existingUser.name
        if (!comparedPass) {
            res.json({ message: "Email and Password Does not match !" })
        }
        else {
            res.json({ message: `Welcome ${existingUser.name}`, userName })
        }
    }
})


app.listen(8080, () => {
    console.log("Server is running...");

})