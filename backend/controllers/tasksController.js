const config = require('../knexfile').development
const knex = require('knex')(config)

// TODO: change this query to get all attributes basically - need things like priorityName, for ex.
const getQueryBase = `
  select t.task_id, task_description, task_deadline, task_status, task_type, task_priority,
  task_product_manager, task_name, et.engineer_id, engineer_tasks_id, tt.tag_id, tagged_tasks_id,
  engineer_name, e.label_color as engineer_label_color, tag_name, tg.label_color as tag_label_color,
  tp.priority_name
  from tasks as t
  left join engineer_tasks as et on t.task_id = et.task_id
  left join tagged_tasks as tt on t.task_id = tt.task_id
  left join engineer as e on et.engineer_id = e.engineer_id
  left join tag as tg on tt.tag_id = tg.tag_id
  join priority as tp on tp.priority_id = t.task_priority
`

// const testQuery = `
//   select t.task_name, p.priority_name as namedhgj
//   from tasks as t
//   join priority as p on t.task_priority = p.priority_id
// `

const getTasks = (req, res) => {
  knex.raw(`${getQueryBase};`)
    .then(tasks => {
      const cleanedTasks = []
      tasks.rows.forEach(task => {
        const t = {
          task_id: task.task_id,
          task_description: task.task_description,
          task_deadline: task.task_deadline,
          task_status: task.task_status,
          task_type: task.task_type,
          task_priority: task.priority_name,
          task_product_manager: task.task_product_manager,
          task_name: task.task_name,
          task_engineers: [],
          task_tags: []
        }
        if (!cleanedTasks.find(ct => ct.task_id === task.task_id)) cleanedTasks.push(t)

        // get the task from cleanedTasks for engineer and tag array manipulations if applicable
        const cleanedTask = cleanedTasks.find(ct => ct.task_id === task.task_id)
      
        /* if the tag/engineer_id is not null, and it's not already in its respective array inside
        the cleanedTask object, then add it */
        if (
          task.tag_id
          && !cleanedTask.task_tags.find(tag => tag.tag_id === task.tag_id)
        ) {
          cleanedTask.task_tags.push({
            tag_id: task.tag_id,
            tag_name: task.tag_name,
            tag_label_color: task.tag_label_color
          })
        }

        if (
          task.engineer_id
          && !cleanedTask.task_engineers.find(engineer => engineer.engineer_id === task.engineer_id)
        ) {
          cleanedTask.task_engineers.push({
            engineer_id: task.engineer_id,
            engineer_name: task.engineer_name,
            engineer_label_color: task.engineer_label_color
          })
      }
      })

      res.json(cleanedTasks)
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
}

const getTask = (req, res) => {
  knex.raw(`${getQueryBase} where t.task_id=${req.params.id};`)
    .then(task => {
      const t = task.rows[0]

      const cleanedTask = {
        task_id: t.task_id,
        task_description: t.task_description,
        task_deadline: t.task_deadline,
        task_status: t.task_status,
        task_type: t.task_type,
        task_priority: t.priority_name,
        task_product_manager: t.task_product_manager,
        task_name: t.task_name,
        task_engineers: [],
        task_tags: []
      }
      task.rows.forEach(row => {
        if (
          !cleanedTask.task_engineers.find(engineer => engineer.engineer_id === row.engineer_id)
          && row.engineer_id
        ) {
          cleanedTask.task_engineers.push({
            engineer_id: row.engineer_id,
            engineer_name: row.engineer_name,
            engineer_label_color: row.engineer_label_color
          })
        }
        if (
          !cleanedTask.task_tags.find(tag => tag.tag_id === row.tag_id)
          && row.tag_id
        ) {
          cleanedTask.task_tags.push({
            tag_id: row.tag_id,
            tag_name: row.tag_name,
            tag_label_color: row.tag_label_color
          })
        }
      })
      res.json(cleanedTask)
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
}

const formatTaskBody = async (body) => {
  const statusId = await knex('status').where({ status_name: body.task_status }).then(status => status[0]?.status_id)
  const priorityId = await knex('priority').where({ priority_name: body.task_priority }).then(id => id[0]?.priority_id)
  const typeId = await knex('type').where({ type_name: body.task_type }).then(type => type[0]?.type_id)
  const pmId = await knex('product_manager').where({ product_manager_name: body.task_product_manager }).then(pm => pm[0]?.product_manager_id)

  const formattedTaskBody = {
    task_name: body.task_name,
    task_description: body.task_description,
    task_deadline: body.task_deadline,
    task_status: statusId,
    task_priority: priorityId,
    task_type: typeId,
    task_product_manager: pmId
  }

  return formattedTaskBody
}

const postTask = async (req, res) => {
  const formattedTaskBody = await formatTaskBody(req.body)

  knex('tasks')
    .insert(formattedTaskBody)
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

const updateTask = async (req, res) => {
  const formattedTaskBody = await formatTaskBody(req.body)

  knex('tasks')
    .where( { task_id: req.params.id })
    .returning('task_id')
    .update(formattedTaskBody)
    .then(taskId => {
      taskId = taskId[0]

      // update engineer_tasks
      knex('engineer_tasks')
        .where({ task_id: taskId })
        .delete()
        .then(() => {
          req.body.task_engineers.forEach(engineer => {
            knex('engineer')
              .where({ engineer_name: engineer })
              .then(engineer => {
                knex.raw(`
                  INSERT INTO engineer_tasks VALUES (${engineer[0].engineer_id}, ${taskId});
                `)
                .then(() => console.log(`successfully updated engineers for task ${taskId}`))
                .catch(err => res.json(err))
              })
            })
        })
        .catch(err => {
          console.log(err)
          res.json(err)
        })

      // update tasks
      knex('tagged_tasks')
        .where({ task_id: taskId })
        .delete()
        .then(() => {
          req.body.task_tags.forEach(tag => {
            knex('tag')
              .where({ tag_name: tag })
              .then(tag => {
                knex.raw(`
                  INSERT INTO tagged_tasks VALUES (${tag[0].tag_id}, ${taskId});
                `)
                .then(() => console.log(`successfully updated tags for task ${taskId}`))
                .catch(err => res.json(err))
              })
            })
        })
        .catch(err => {
          console.log(err)
          res.json(err)
        })
    })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err)
      res.json(err)
    })
}

// since foreign keys on junction tables are CASCADE deletes, obly have to delete the task
const deleteTask = async (req, res) => {
  knex('tasks')
    .where( { task_id: req.params.id })
    .delete()
    .then(task => res.json(task))
    .catch(err => res.json(err))
}

module.exports = { getTasks, getTask, postTask, updateTask, deleteTask }