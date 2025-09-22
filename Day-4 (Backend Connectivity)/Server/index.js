const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())


app.post('/send-data', (req, res) => {
    const {name , surname} = req.body
    console.log(name)
    console.log(surname)

    res.json({message : 'Data received successfully'})
})

app.listen(8080, () => {
    console.log('Server is Running...')
})