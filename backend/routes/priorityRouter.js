const express = require('express')

const {
  getPriorities,
  getPriority,
  postPriority,
  updatePriority,
  deletePriority
} = require('../controllers/PriorityController.js')

const router = express.Router()

router.get('/', getPriorities)
router.get('/:id', getPriority)
router.post('/', postPriority)
router.put('/:id', updatePriority)
router.delete('/:id', deletePriority)

module.exports = router