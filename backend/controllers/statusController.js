const config = require('../knexfile').development
const knex = require('knex')(config)

const getStatuses = async (req, res) => {
  knex('status')
    .then(statuses => res.json(statuses))
    .catch(err => res.json(err))
}

const getStatus = async (req, res) => {
  knex('status')
    .where( { status_id: req.params.id })
    .then(status => res.json(status))
    .catch(err => res.json(err))
}

const postStatus = async (req, res) => {
  knex('status')
    .insert(req.body)
    .returning('*')
    .then(status => res.json(status))
    .catch(err => res.json(err))
}

const updateStatus = async (req, res) => {
  knex('status')
    .where( { status_id: req.params.id })
    .update(req.body)
    .returning('*')
    .then(status => res.json(status))
    .catch(err => res.json(err))
}

const deleteStatus = async (req, res) => {
  knex('status')
    .where( { status_id: req.params.id })
    .delete()
    .returning('*')
    .then(statuses => res.json(statuses))
    .catch(err => res.json(err))
}

module.exports = { getStatuses, getStatus, postStatus, updateStatus, deleteStatus }