const config = require('../knexfile').development
const knex = require('knex')(config)

// TODO: properly write this function
// ? will have to be a bunch of table joins to properly return each task
const getTasks = (req, res) => {
  knex('tasks')
    .returning('*')
    .then(tasks => res.json(tasks))
    .catch(err => res.json(err))
}

// TODO: write the deleteTask function and include in router
// ! note: this will have to be a cascading delete to both the tagged_tasks and engineer_tasks tables
const deleteTask = async (req, res) => {
  knex('tasks')
}

// TODO: write the updateTask function and include in router
// ! note: this is a cascading update
const updateTask = async (req, res) => {

}

const postTask = async (req, res) => {
  const statusId = await knex('status').where({ status_name: req.body.task_status }).then(status => status[0]?.status_id)
  const priorityId = await knex('priority').where({ priority_name: req.body.task_priority }).then(id => id[0]?.priority_id)
  const typeId = await knex('type').where({ type_name: req.body.task_type }).then(type => type[0]?.type_id)
  const pmId = await knex('product_manager').where({ product_manager_name: req.body.task_product_manager }).then(pm => pm[0]?.product_manager_id)

  const bodyWithForeignKeys = {
    task_name: req.body.task_name,
    task_description: req.body.task_description,
    task_deadline: req.body.task_deadline,
    task_status: statusId,
    task_priority: priorityId,
    task_type: typeId,
    task_product_manager: pmId
  }

  knex('tasks')
    .insert(bodyWithForeignKeys)
    .returning('task_id')
    .then(taskId => {
      req.body.task_tags.forEach(tag => {
        knex('tag')
          .where({ tag_name: tag })
          .then(tag => tag[0]?.tag_id)
          .then(tagId => {
            knex('tagged_tasks')
              .insert({
                task_id: taskId[0],
                tag_id: tagId
              })
              .then(data => console.log(data))
          })
          .then(data => res.json(data))
      })
      req.body.task_engineers.forEach(engineer => {
        knex('engineer')
          .where({ engineer_name: engineer })
          .then(engineer => engineer[0]?.engineer_id)
          .then(engineerId => {
            knex('engineer_tasks')
              .insert({
                task_id: taskId[0],
                engineer_id: engineerId
              })
              .then(data => console.log(data))
          })
          .then(data => res.json(data))
      })
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
}

module.exports = { getTasks, postTask }