import React, { useState, useEffect, useReducer } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import { generateTaskOrder } from '../utils/utils'
import { fetchData, updateItem } from '../utils/api'
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
      draggableId,
      source: { index: sourceIndex, droppableId: sourceColumn },
      destination: { index: destinationIndex, droppableId: destinationColumn }
    } = result

    /*
      ! The problem: destinationTasks is set too quickly or incorrectly.
      * it's already what it should be before the splice actually happens.
    */
    const destinationTasks = [...state.columns[`${destinationColumn}`].tasks]
    console.log('dtasks first', destinationTasks)
    const destinationColumnId = state.columns[`${destinationColumn}`].columnId

    if (sourceColumn === destinationColumn) {
      console.log('si', sourceIndex)
      console.log('di', destinationIndex)
      console.log('dtasks prior to splice', destinationTasks)
      const [removed] = destinationTasks.splice(sourceIndex, 1)

      console.log('r', removed)
      destinationTasks.splice(destinationIndex, 0, removed)

      console.log('dt', destinationTasks)

      dispatch({ type: 'dragWithinColumn', payload: { destinationColumn, destinationTasks } })
    } 
    else {
      const sourceTasks = [...state.columns[`${sourceColumn}`].tasks]
      const sourceColumnId = state.columns[`${sourceColumn}`].columnId

      const [removed] = sourceTasks.splice(sourceIndex, 1)
      removed.task_status = destinationColumn
      removed.status_label_color = state.columns[destinationColumn].columnColor
      destinationTasks.splice(destinationIndex, 0, removed)

      dispatch({
        type: 'dragToDifferentColumn',
        payload: { sourceColumn, destinationColumn, sourceTasks, destinationTasks }
      })

      const taskBody = { task_status: destinationColumn }
      await updateItem('/tasks', parseInt(draggableId), taskBody)
      
      const sourceColumnTaskOrder = generateTaskOrder(sourceTasks)
      const sourceColumnBody = { column_order: sourceColumnTaskOrder }
      await updateItem('/column', sourceColumnId, sourceColumnBody)
    }

    const destinationColumnTaskOrder = generateTaskOrder(destinationTasks)
    const destinationColumnBody = { column_order: destinationColumnTaskOrder }
    await updateItem('/column', destinationColumnId, destinationColumnBody)
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

  useEffect(() => {
    console.log('bo to: ', state.columns['Ready']?.taskOrder)
  }, [state])

  return (
    <StyledContainer>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <ColumnContainer>
          {Object.entries(state.columns).map(([key, column]) => {
            // console.log('to', state.columns[`${key}`]?.taskOrder)
            return (
              <Column
                key={key}
                title={key}
                color={column.columnColor}
                // tasks={value.tasks}
                taskOrder={column.taskOrder}
                tasks={column.tasks}
                // taskOrder={state.columns[`${column}`]?.taskOrder}
                width={(100 / columns.length - 1)}
                length={column.tasks.length}
                showProperties={showProperties}
              />
            )
          })}
        </ColumnContainer>
      </DragDropContext>
    </StyledContainer>
  )
}

export default BoardContainer