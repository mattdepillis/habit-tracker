const express = require('express')

const { getTasks, postTask } = require('../controllers/tasks.js')

const router = express.Router()

// put CRUD routes in here for the tasks

router.get('/', getTasks)
router.post('/', postTask)

module.exports = router