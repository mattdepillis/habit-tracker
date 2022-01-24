import React, { useState, useEffect, useReducer } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { Spinner } from 'react-bootstrap'

import { fetchData, updateItem } from '../utils/api'
import { boardReducer } from '../utils/boardReducer'
import { StyledContainer, ColumnContainer } from '../styles/BoardContainer'
import Column from './Column'

const BoardContainer = ({
  showProperties,
  loading,
  setLoading,
  setShowTask,
  setTaskToDisplay
}) => {
  const [columns, setColumns] = useState([])
  const [tasks, setTasks] = useState([])
  const [taskIdToDisplay, setTaskIdToDisplay] = useState('')

  const initialState = { columns: {} }
  const [state, dispatch] = useReducer(boardReducer, initialState)

  const loadData = async () => {
    setColumns(await fetchData('/column'))
    setTasks(await fetchData('/tasks'))
    setLoading(!loading)
  }

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

    const {
      tasks: srcTasks,
      taskOrder: srcColumnOrder,
      columnId: sourceColumnId,
    } = state.columns[`${sourceColumn}`]

    const sourceColumnTasks = [...srcTasks]
    const sourceColumnOrder = [...srcColumnOrder]

    const [removed] = sourceColumnOrder.splice(sourceIndex, 1)

    if (sourceColumn === destinationColumn) {
      sourceColumnOrder.splice(destinationIndex, 0, removed)

      dispatch({
        type: 'dragWithinColumn',
        payload: { sourceColumn, sourceColumnOrder, sourceColumnTasks }
      })
    }

    else {
      const {
        tasks: destTasks,
        taskOrder: destColumnOrder,
        columnId: destinationColumnId,
        columnColor: destinationColumnColor
      } = state.columns[`${destinationColumn}`]

      const destinationColumnTasks = [...destTasks]
      const destinationColumnOrder = [...destColumnOrder]

      destinationColumnOrder.splice(destinationIndex, 0, removed)

      dispatch({
        type: 'dragToDifferentColumn',
        payload: {
          sourceColumn, sourceColumnOrder, sourceColumnTasks,
          destinationColumn, destinationColumnOrder, destinationColumnTasks,
          destinationColumnColor, removed
        }
      })

      // update the destination column order in the db.
      const destinationColumnBody = { column_order: destinationColumnOrder }
      await updateItem('/column', destinationColumnId, destinationColumnBody)

      // update the dragged task's new task status in the db.
      const taskBody = { task_status: destinationColumn }
      await updateItem('/tasks', parseInt(draggableId), taskBody)
    }

    // update the source column order in the db.
    const sourceColumnBody = { column_order: sourceColumnOrder }
    await updateItem('/column', sourceColumnId, sourceColumnBody)
  }

  useEffect(() => {
    if (loading) loadData()
  }, [loading])

  useEffect(() => {
    if (columns.length > 0 && tasks.length > 0) {
      dispatch({ type: 'setState', payload: { columns, tasks } })
    }
  }, [columns, tasks])

  useEffect(() => {
    if (taskIdToDisplay !== '') {
      setShowTask(true)
      setTaskToDisplay(tasks.find(task => task.task_id === taskIdToDisplay))
    }
  }, [taskIdToDisplay])

  return (
    <StyledContainer>
      {loading ?
        <Spinner
          animation="border"
          variant="light" 
        />
        :
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <ColumnContainer>
            {Object.entries(state.columns).map(([key, column]) => (
              <Column
                key={key}
                title={key}
                color={column.columnColor}
                tasks={column.tasks}
                taskOrder={column.taskOrder}
                width={(100 / columns.length - 1)}
                length={column.tasks.length}
                showProperties={showProperties}
                setLoading={setLoading}
                setTaskIdToDisplay={setTaskIdToDisplay}
              />
            ))}
          </ColumnContainer>
        </DragDropContext>
      }
    </StyledContainer>
  )
}

export default BoardContainer
