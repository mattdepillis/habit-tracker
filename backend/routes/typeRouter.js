const express = require('express')

const {
  getTypes,
  getType,
  postType,
  updateType,
  deleteType
} = require('../controllers/typeController.js')

const router = express.Router()

router.get('/', getTypes)
router.get('/:id', getType)
router.post('/', postType)
router.put('/:id', updateType)
router.delete('/:id', deleteType)

module.exports = router