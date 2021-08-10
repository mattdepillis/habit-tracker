const config = require('../knexfile').development
const knex = require('knex')(config)

const getTags = async (req, res) => {
  knex('tag')
    .then(tags => res.json(tags))
    .catch(err => res.json(err))
}

const getTag = async (req, res) => {
  knex('tag')
    .where( { tag_id: req.params.id })
    .then(tag => res.json(tag))
    .catch(err => res.json(err))
}

const postTag = async (req, res) => {
  knex('tag')
    .insert(req.body)
    .returning('*')
    .then(tag => res.json(tag))
    .catch(err => res.json(err))
}

const updateTag = async (req, res) => {
  knex('tag')
    .where( { tag_id: req.params.id })
    .update(req.body)
    .returning('*')
    .then(tag => res.json(tag))
    .catch(err => res.json(err))
}

const deleteTag = async (req, res) => {
  knex('tag')
    .where( { tag_id: req.params.id })
    .delete()
    .returning('*')
    .then(tags => res.json(tags))
    .catch(err => res.json(err))
}

module.exports = { getTags, getTag, postTag, updateTag, deleteTag }