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
          columnId: column.column_id,
          columnColor: column.column_color,
          tasks: [],
          taskOrder: column.column_order
        }
      })

      tasks.forEach(task =>
        newColumns[task.task_status].tasks.push(task)
      )

      return { ...state, columns: newColumns }
    }

    case 'dragWithinColumn': {
      const { destinationColumn, destinationTasks } = payload

      newColumns = { ...state.columns }

      // console.log(destinationTasks)

      newColumns[`${destinationColumn}`].tasks = destinationTasks
      newColumns[`${destinationColumn}`].taskOrder = destinationTasks.map(t => t.task_id)

      return { ...state, columns: newColumns }
    }

    case 'dragToDifferentColumn': {
      const { sourceColumn, destinationColumn, sourceTasks, destinationTasks } = payload

      console.log(state.columns)

      newColumns = { ...state.columns }

      newColumns[`${sourceColumn}`].tasks = sourceTasks
      newColumns[`${destinationColumn}`].tasks = destinationTasks

      newColumns[`${sourceColumn}`].taskOrder = sourceTasks.map(t => t.task_id)
      newColumns[`${destinationColumn}`].taskOrder = destinationTasks.map(t => t.task_id)

      return { ...state, columns: newColumns }
    }

    default: {
      return { ...state }
    }
  }
}
