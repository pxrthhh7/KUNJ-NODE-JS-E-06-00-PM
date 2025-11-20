const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    otp: Number,
    role: {
        type: String,
        default : "User"
    }
})

const authModel = mongoose.model("users",authSchema)

module.exports = authModel