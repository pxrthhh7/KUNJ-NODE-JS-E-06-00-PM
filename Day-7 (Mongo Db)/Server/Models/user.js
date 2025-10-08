const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const authModel = mongoose.model("users", authSchema)

module.exports = authModel