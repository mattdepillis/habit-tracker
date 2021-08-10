const express = require('express')

const {
  getTags,
  getTag,
  postTag,
  updateTag,
  deleteTag
} = require('../controllers/tagController.js')

const router = express.Router()

router.get('/', getTags)
router.get('/:id', getTag)
router.post('/', postTag)
router.put('/:id', updateTag)
router.delete('/:id', deleteTag)

module.exports = router