/**
 * manages the high-level state of the kanban board: columns and the tasks within them.

 * @param {Object} state the current board state.
 * @param {Object} action the action to perform on the current state.
 * @returns {Object} the new high-level board state.
*/
export const boardReducer = (state, action) => {
  const { type, payload } = action
  let newColumns = {}

  switch (type) {
    case 'setState': {
      const { columns, tasks } = payload

      columns.forEach(column => {
        newColumns[column.column_name] = {
          columnColor: column.column_color,
          tasks: [],
          taskOrder: []
        }
      })

      tasks.forEach(task => {
        newColumns[task.task_status].tasks.push(task)
        newColumns[task.task_status].taskOrder.push(task.task_id)
      })

      return { ...state, columns: newColumns }
    }

    case 'dragWithinColumn': {
      const { destinationColumn, destinationTasks } = payload

      newColumns = { ...state.columns }
      newColumns[`${destinationColumn}`].tasks = destinationTasks
      newColumns[`${destinationColumn}`].taskOrder = destinationTasks.map(t => t.task_id)

      return { ...state, columns: newColumns }
    }

    case 'dragToDifferentColumn': {
      const { sourceColumn, destinationColumn, sourceTasks, destinationTasks } = payload

      newColumns = { ...state.columns }
      newColumns[`${sourceColumn}`].tasks = sourceTasks
      newColumns[`${destinationColumn}`].tasks = destinationTasks
      newColumns[`${destinationColumn}`].taskOrder = destinationTasks.map(t => t.task_id)

      return { ...state, columns: newColumns }
    }

    default: {
      return { ...state }
    }
  }
}
