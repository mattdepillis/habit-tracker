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

      console.log('t', tasks)

      tasks.forEach(task =>
        newColumns[task.task_status].tasks.push(task)
      )

      console.log('nc', newColumns)

      return { ...state, columns: newColumns }
    }

    case 'dragWithinColumn': {
      const { sourceColumn, sourceColumnOrder, sourceColumnTasks } = payload

      newColumns = { ...state.columns }

      newColumns[`${sourceColumn}`].taskOrder = sourceColumnOrder
      newColumns[`${sourceColumn}`].tasks =
        sourceColumnOrder.map(id => sourceColumnTasks.find(task => task.task_id === id))

      return { ...state, columns: newColumns }
    }

    case 'dragToDifferentColumn': {
      const {
        sourceColumn, sourceColumnOrder, sourceColumnTasks,
        destinationColumn, destinationColumnOrder, destinationColumnTasks,
        destinationColumnColor, removed
      } = payload

      const allTasks = [...sourceColumnTasks, ...destinationColumnTasks]

      const removedTask = allTasks.find(task => task.task_id === removed)
      removedTask.task_status = destinationColumn
      removedTask.status_label_color = destinationColumnColor

      newColumns = { ...state.columns }

      newColumns[`${sourceColumn}`].taskOrder = sourceColumnOrder
      newColumns[`${sourceColumn}`].tasks =
        sourceColumnOrder.map(id => allTasks.find(task => task.task_id === id))
      
      newColumns[`${destinationColumn}`].taskOrder = destinationColumnOrder
      newColumns[`${destinationColumn}`].tasks =
        destinationColumnOrder.map(id => allTasks.find(task => task.task_id === id))

      return { ...state, columns: newColumns }
    }

    default: {
      return { ...state }
    }
  }
}
