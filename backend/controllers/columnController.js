const config = require('../knexfile').development
const knex = require('knex')(config)

const getColumns = async (req, res) => {
  knex('columns')
    .orderBy('column_id')
    .then(columns => res.json(columns))
    .catch(err => res.json(err))
}

const getColumn = async (req, res) => {
  knex('columns')
    .where( { column_id: req.params.id })
    .then(column => res.json(column))
    .catch(err => res.json(err))
}

const postColumn = async (req, res) => {
  knex('columns')
    .insert(req.body)
    .returning('*')
    .then(column => res.json(column))
    .catch(err => res.json(err))
}

const updateColumn = async (req, res) => {
  knex('columns')
    .where( { column_id: req.params.id })
    .returning('*')
    .update(req.body)
    .then(column => res.json(column))
    .catch(err => res.json(err))
}

const deleteColumn = async (req, res) => {
  knex('columns')
    .where({ column_id: req.params.id })
    .delete()
    .returning('*')
    .then(columns => res.json(columns))
    .catch(err => res.json(err))
}

module.exports = { getColumns, getColumn, postColumn, updateColumn, deleteColumn }