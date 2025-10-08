const express = require('express')
const cors = require('cors')
const e = require('express')
const app = express()
app.use(express.json())
app.use(cors())

const usersData = []

function auth(req, res, next) {

    let token = 4397

    if (token) {
        next()
    }
    else {
        res.json({ message: "invalid !" })
    }
}

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = usersData.find(e => e.email === email && e.password === password);

    if (user) {
        res.json({ message: "Valid !", name: user.name });
    } else {
        res.json({ message: "Invalid !" });
    }
});


app.post("/signup", (req, res) => {
    const { name, email, password } = req.body

    const user = {
        name: name,
        email: email,
        password: password
    }

    usersData.push(user)
    console.log(usersData)
    res.json({
        message: "User Added !",
        users: usersData
    })
})

app.get("/dashbord", auth, (req, res) => {
    res.json({ message: "User Dashbord !" })
})

app.listen(8080, () => {
    console.log("server is running...");
})