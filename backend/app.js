const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const taskRouter = require('./routes/tasks.js')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/tasks', taskRouter)

const mongooseParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}`, mongooseParams)
  .then(() => app.listen(port, () => console.log(`app running on port ${port}`)))
  .catch((err) => console.error(err))