const express = require('express')
const cors = require('cors')

const columnRouter = require('./routes/columnRouter')
const engineerRouter = require('./routes/engineerRouter')
const priorityRouter = require('./routes/priorityRouter')
const productManagerRouter = require('./routes/productManagerRouter')
const statusRouter = require('./routes/statusRouter')
const tagRouter = require('./routes/tagRouter')
const taskRouter = require('./routes/tasksRouter')
const typeRouter = require('./routes/typeRouter')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/column', columnRouter)
app.use('/engineer', engineerRouter)
app.use('/priority', priorityRouter)
app.use('/product-manager', productManagerRouter)
app.use('/status', statusRouter)
app.use('/tag', tagRouter)
app.use('/tasks', taskRouter)
app.use('/type', typeRouter)

app.listen(port, "0.0.0.0", () => console.log(`app running on port ${port}`))