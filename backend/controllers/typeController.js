const config = require('../knexfile').development
const knex = require('knex')(config)

const getTypes = async (req, res) => {
  knex('type')
    .then(types => res.json(types))
    .catch(err => res.json(err))
}

const getType = async (req, res) => {
  knex('type')
    .where( { type_id: req.params.id })
    .then(type => res.json(type))
    .catch(err => res.json(err))
}

const postType = async (req, res) => {
  knex('type')
    .insert(req.body)
    .returning('*')
    .then(type => res.json(type))
    .catch(err => res.json(err))
}

const updateType = async (req, res) => {
  knex('type')
    .where( { type_id: req.params.id })
    .update(req.body)
    .returning('*')
    .then(type => res.json(type))
    .catch(err => res.json(err))
}

const deleteType = async (req, res) => {
  knex('type')
    .where( { type_id: req.params.id })
    .delete()
    .returning('*')
    .then(types => res.json(types))
    .catch(err => res.json(err))
}

module.exports = { getTypes, getType, postType, updateType, deleteType }