const config = require('../knexfile').development
const knex = require('knex')(config)

const getEngineers = async (req, res) => {
  knex('engineer')
    .then(engineers => res.json(engineers))
    .catch(err => res.json(err))
}

const getEngineer = async (req, res) => {
  knex('engineer')
    .where( { engineer_id: req.params.id })
    .then(engineer => res.json(engineer))
    .catch(err => res.json(err))
}

const postEngineer = async (req, res) => {
  knex('engineer')
    .insert(req.body)
    .returning('*')
    .then(engineer => res.json(engineer))
    .catch(err => res.json(err))
}

const updateEngineer = async (req, res) => {
  knex('engineer')
    .where( { engineer_id: req.params.id })
    .update(req.body)
    .returning('*')
    .then(engineer => res.json(engineer))
    .catch(err => res.json(err))
}

const deleteEngineer = async (req, res) => {
  knex('engineer')
    .where( { engineer_id: req.params.id })
    .delete()
    .returning('*')
    .then(engineers => res.json(engineers))
    .catch(err => res.json(err))
}

module.exports = { getEngineers, getEngineer, postEngineer, updateEngineer, deleteEngineer }