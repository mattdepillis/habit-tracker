const express = require('express')

const { getTasks, getTask, postTask, deleteTask } = require('../controllers/tasksController.js')

const router = express.Router()

// put CRUD routes in here for the tasks

router.get('/', getTasks)
router.get('/:id', getTask)
router.post('/', postTask)
router.delete('/:id', deleteTask)

module.exports = router