const express = require('express')

const {
  getEngineers,
  getEngineer,
  postEngineer,
  updateEngineer,
  deleteEngineer
} = require('../controllers/engineerController.js')

const router = express.Router()

router.get('/', getEngineers)
router.get('/:id', getEngineer)
router.post('/', postEngineer)
router.put('/:id', updateEngineer)
router.delete('/:id', deleteEngineer)

module.exports = router