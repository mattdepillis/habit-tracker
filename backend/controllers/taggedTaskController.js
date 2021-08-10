const config = require('../knexfile').development
const knex = require('knex')(config)

const getTaggedTasks = async (req, res) => {
  knex('tagged_tasks')
    .then(taggedTasks => res.json(taggedTasks))
    .catch(err => res.json(err))
}

const getTaggedTask = async (req, res) => {
  knex('tagged_tasks')
    .where( { tag_id: req.params.id })
    .then(taggedTask => res.json(taggedTask))
    .catch(err => res.json(err))
}

const postTaggedTask = async (req, res) => {
  knex('tagged_tasks')
    .insert(req.body)
    .returning('*')
    .then(taggedTask => res.json(taggedTask))
    .catch(err => res.json(err))
}

const updateTaggedTask = async (req, res) => {
  knex('tagged_tasks')
    .where( { tag_id: req.params.id })
    .update(req.body)
    .returning('*')
    .then(taggedTask => res.json(taggedTask))
    .catch(err => res.json(err))
}

const deleteTaggedTask = async (req, res) => {
  knex('tagged_tasks')
    .where( { tag_id: req.params.id })
    .delete()
    .returning('*')
    .then(taggedTasks => res.json(taggedTasks))
    .catch(err => res.json(err))
}

module.exports = { getTaggedTasks, getTaggedTask, postTaggedTask, updateTaggedTask, deleteTaggedTask }