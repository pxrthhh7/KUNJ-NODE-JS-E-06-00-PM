const http = require("http")

const app = http.createServer((req, res) => {
    res.end("Hello !!!")
})

app.listen(8080, () => {
    console.log("Server is Started !!!")
})