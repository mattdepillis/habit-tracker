const express = require('express')

const {
  getStatuses,
  getStatus,
  postStatus,
  updateStatus,
  deleteStatus
} = require('../controllers/statusController.js')

const router = express.Router()

router.get('/', getStatuses)
router.get('/:id', getStatus)
router.post('/', postStatus)
router.put('/:id', updateStatus)
router.delete('/:id', deleteStatus)

module.exports = router