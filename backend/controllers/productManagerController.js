const config = require('../knexfile').development
const knex = require('knex')(config)

const getProductManagers = async (req, res) => {
  knex('product_manager')
    .then(tags => res.json(tags))
    .catch(err => res.json(err))
}

const getProductManager = async (req, res) => {
  knex('product_manager')
    .where( { tag_id: req.params.id })
    .then(productManager => res.json(productManager))
    .catch(err => res.json(err))
}

const postProductManager = async (req, res) => {
  knex('product_manager')
    .insert(req.body)
    .returning('*')
    .then(productManager => res.json(productManager))
    .catch(err => res.json(err))
}

const updateProductManager = async (req, res) => {
  knex('product_manager')
    .where( { tag_id: req.params.id })
    .update(req.body)
    .returning('*')
    .then(productManager => res.json(productManager))
    .catch(err => res.json(err))
}

const deleteProductManager = async (req, res) => {
  knex('product_manager')
    .where( { tag_id: req.params.id })
    .delete()
    .returning('*')
    .then(tags => res.json(tags))
    .catch(err => res.json(err))
}

module.exports = { getProductManagers, getProductManager, postProductManager, updateProductManager, deleteProductManager }