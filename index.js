const express = require('express')
const { ConnectionDB } = require('./ConnectionDB/Connection')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
ConnectionDB()

app.use(cors())
app.use(bodyParser.json())
const PORT = process.env.PORT || 5000


app.get('/',(req,res) => res.send("hello from server"))

const userRoute = require('./Routes/UserRoute')
app.use('/user',userRoute)

app.listen(PORT,()=>console.log("Server is running at PORT",PORT))