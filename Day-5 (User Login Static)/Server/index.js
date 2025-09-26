const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

const Email = "admin@gmail.com"
const Password = "admin123"

app.post('/login', (req, res) => {
    const { email, password } = req.body

    if (email === Email && password === Password) {
        res.json({ message: "User LoggedIn !" })
    }
    else {
        res.json({ message: "Email and Password Don't Match !" })
    }

})

app.listen(8080, () => {
    console.log("Server is running...")
})