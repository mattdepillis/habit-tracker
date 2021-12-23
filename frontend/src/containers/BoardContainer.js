import React, { useState, useEffect, useReducer } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import { fetchData, updateTask } from '../utils/api'
import { boardReducer } from '../utils/boardReducer'
import { StyledContainer, ColumnContainer } from '../styles/BoardContainer'
import Column from './Column'


const BoardContainer = ({
  showModal,
  showProperties
}) => {
  const [columns, setColumns] = useState([])
  const [tasks, setTasks] = useState([])

  const initialState = { columns: {} }
  const [state, dispatch] = useReducer(boardReducer, initialState)

  const setKanbanColumns = async () => setColumns(await fetchData('/column'))
  const setTaskList = async () => setTasks(await fetchData('/tasks'))

  /*
    mandatory react-beautiful-dnd callback function for DragDropContext.
    at the end of a drag, the tasks are reordered on screen and fire a reducer action.
    
    * NOTE: must update ordering synchronously.
      as a result, on a drag to a different column the function first manually updates the state of a
      dragged task to update the UI synchronously. Then, it makes a PUT call to update in the db.
  */
  const onDragEnd = async (result) => {
    const {
      source: { index: sourceIndex, droppableId: sourceColumn },
      destination: { index: destinationIndex, droppableId: destinationColumn },
      draggableId
    } = result

    const destinationTasks = [...state.columns[`${destinationColumn}`].tasks]

    if (sourceColumn === destinationColumn) {
      const [removed] = destinationTasks.splice(sourceIndex, 1)
      destinationTasks.splice(destinationIndex, 0, removed)

      dispatch({ type: 'dragWithinColumn', payload: { destinationColumn, destinationTasks } })
    } 
    else {
      const sourceTasks = [...state.columns[`${sourceColumn}`].tasks]

      const [removed] = sourceTasks.splice(sourceIndex, 1)
      removed.task_status = destinationColumn
      removed.status_label_color = state.columns[destinationColumn].columnColor

      destinationTasks.splice(destinationIndex, 0, removed)

      dispatch({
        type: 'dragToDifferentColumn',
        payload: { sourceColumn, destinationColumn, sourceTasks, destinationTasks }
      })

      await updateTask(parseInt(draggableId), destinationColumn)
    }
  }

  useEffect(() => {
    setKanbanColumns()
    setTaskList()
  }, [])

  useEffect(() => {
    if (!showModal) setTaskList()
  }, [showModal])

  useEffect(() => {
    if (columns.length > 0 && tasks.length > 0) {
      dispatch({ type: 'setState', payload: { columns, tasks } })
    }
  }, [columns, tasks])

  return (
    <StyledContainer>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <ColumnContainer>
          {Object.entries(state.columns).map(([key, value]) => (
            <Column
              key={key}
              title={key}
              color={value.columnColor}
              tasks={value.tasks}
              taskOrder={value.taskOrder}
              width={(100 / columns.length - 1)}
              length={value.tasks.length}
              showProperties={showProperties}
            />
          ))}
        </ColumnContainer>
      </DragDropContext>
    </StyledContainer>
  )
}

export default BoardContainer