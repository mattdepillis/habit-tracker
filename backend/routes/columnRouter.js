const express = require('express')

const {
  getColumn,
  getColumns,
  postColumn,
  updateColumn,
  deleteColumn
} = require('../controllers/columnController.js')

const router = express.Router()

router.get('/', getColumns)
router.get('/:id', getColumn)
router.post('/', postColumn)
router.put('/:id', updateColumn)
router.delete('/:id', deleteColumn)

module.exports = router