const config = require('../knexfile').development
const knex = require('knex')(config)

const getEngineerTasks = async (req, res) => {
  knex('engineer_tasks')
    .then(engineerTasks => res.json(engineerTasks))
    .catch(err => res.json(err))
}

const getEngineerTask = async (req, res) => {
  knex('engineer_tasks')
    .where( { task_id: req.params.id })
    .then(engineerTask => res.json(engineerTask))
    .catch(err => res.json(err))
}

const postEngineerTask = async (req, res) => {
  knex('engineer_tasks')
    .insert(req.body)
    .returning('*')
    .then(engineerTask => res.json(engineerTask))
    .catch(err => res.json(err))
}

const updateEngineerTask = async (req, res) => {
  knex('engineer_tasks')
    .where( { task_id: req.params.id })
    .update(req.body)
    .returning('*')
    .then(engineerTask => res.json(engineerTask))
    .catch(err => res.json(err))
}

const deleteEngineerTask = async (req, res) => {
  knex('engineer_tasks')
    .where( { task_id: req.params.id })
    .delete()
    .returning('*')
    .then(engineerTasks => res.json(engineerTasks))
    .catch(err => res.json(err))
}

module.exports = { getEngineerTasks, getEngineerTask, postEngineerTask, updateEngineerTask, deleteEngineerTask }