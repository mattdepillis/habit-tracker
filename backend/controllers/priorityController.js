const config = require('../knexfile').development
const knex = require('knex')(config)

const getPriorities = async (req, res) => {
  knex('priority')
    .then(priorities => res.json(priorities))
    .catch(err => res.json(err))
}

const getPriority = async (req, res) => {
  knex('priority')
    .where( { priority_id: req.params.id })
    .then(priority => res.json(priority))
    .catch(err => res.json(err))
}

const postPriority = async (req, res) => {
  knex('priority')
    .insert(req.body)
    .returning('*')
    .then(priority => res.json(priority))
    .catch(err => res.json(err))
}

const updatePriority = async (req, res) => {
  knex('priority')
    .where( { priority_id: req.params.id })
    .update(req.body)
    .returning('*')
    .then(priority => res.json(priority))
    .catch(err => res.json(err))
}

const deletePriority = async (req, res) => {
  knex('priority')
    .where( { priority_id: req.params.id })
    .delete()
    .returning('*')
    .then(priorities => res.json(priorities))
    .catch(err => res.json(err))
}

module.exports = { getPriorities, getPriority, postPriority, updatePriority, deletePriority }