const express = require('express')

const {
  getTaggedTasks,
  getTaggedTask,
  postTaggedTask,
  updateTaggedTask,
  deleteTaggedTask
} = require('../controllers/taggedTaskController.js')

const router = express.Router()

router.get('/', getTaggedTasks)
router.get('/:id', getTaggedTask)
router.post('/', postTaggedTask)
router.put('/:id', updateTaggedTask)
router.delete('/:id', deleteTaggedTask)

module.exports = router