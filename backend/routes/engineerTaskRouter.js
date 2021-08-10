const express = require('express')

const {
  getEngineerTasks,
  getEngineerTask,
  postEngineerTask,
  updateEngineerTask,
  deleteEngineerTask
} = require('../controllers/engineerTaskController.js')

const router = express.Router()

router.get('/', getEngineerTasks)
router.get('/:id', getEngineerTask)
router.post('/', postEngineerTask)
router.put('/:id', updateEngineerTask)
router.delete('/:id', deleteEngineerTask)

module.exports = router