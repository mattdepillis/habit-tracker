// TODO: comment here
export const reducer = (state, action) => {
  const { type, payload } = action
  let newColumns = {}
  switch (type) {
    case 'setState': {
      const { columns, tasks } = payload

      columns.forEach(column => {
        newColumns[column.column_name] = {
          columnColor: column.column_color,
          tasks: []
        }
      })

      tasks.forEach(task => newColumns[task.task_status].tasks.push(task))

      return { ...state, columns: newColumns }
    }

    case 'dragWithinColumn': {
      const { destinationColumn, destinationTasks } = payload

      newColumns = { ...state.columns }
      newColumns[`${destinationColumn}`].tasks = destinationTasks

      return { ...state, columns: newColumns }
    }

    case 'dragToDifferentColumn': {
      const { sourceColumn, destinationColumn, sourceTasks, destinationTasks } = payload

      newColumns = { ...state.columns }
      newColumns[`${sourceColumn}`].tasks = sourceTasks
      newColumns[`${destinationColumn}`].tasks = destinationTasks

      return { ...state, columns: newColumns }
    }

    default: {
      return { ...state }
    }
  }
}
