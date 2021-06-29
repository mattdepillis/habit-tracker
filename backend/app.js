const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config();

mongoose.connect(
  `${process.env.MONGO_CONNECTION_STRING}`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)
  .then(() => console.log('Connection to DB established'))
  .catch((err) => console.error(err))


const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// * routes below
app.get('/', (req, res) => {
  res.send("Hello world! this is my habit tracker.")
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send(JSON.stringify({
    response: 'response'
  }))
})

app.listen(port, () => console.log('server listening on port', port))