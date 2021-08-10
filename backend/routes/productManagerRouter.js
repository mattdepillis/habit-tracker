const express = require('express')

const {
  getProductManagers,
  getProductManager,
  postProductManager,
  updateProductManager,
  deleteProductManager
} = require('../controllers/productManagerController.js')

const router = express.Router()

router.get('/', getProductManagers)
router.get('/:id', getProductManager)
router.post('/', postProductManager)
router.put('/:id', updateProductManager)
router.delete('/:id', deleteProductManager)

module.exports = router