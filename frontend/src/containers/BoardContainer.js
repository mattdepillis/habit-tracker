import React, { useState, useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'

import { fetchData, updateTask, getTask } from '../utils/api'
import { reducer } from '../utils/dnd'
import Column from './Column'

const StyledContainer = styled.div`
  margin-top: 10px;
  border-radius: 10px;
  width: 100%;
`

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const BoardContainer = ({
  showModal,
  showProperties
}) => {
  const [columns, setColumns] = useState([])
  const [tasks, setTasks] = useState([])
  const [changedTask, setChangedTask] = useState(-1)

  const initialState = { columns: {} }
  const [state, dispatch] = useReducer(reducer, initialState)

  const setKanbanColumns = async () => setColumns(await fetchData('/column'))
  const setTaskList = async () => setTasks(await fetchData('/tasks'))

  const onDragEnd = async (result) => {
    const {
      source: { index: sourceIndex, droppableId: sourceColumn },
      destination: { index: destinationIndex, droppableId: destinationColumn },
      draggableId
    } = result

    console.log(result)

    const destinationTasks = [...state.columns[`${destinationColumn}`].tasks]

    if (sourceColumn === destinationColumn) {
      const [removed] = destinationTasks.splice(sourceIndex, 1)
      destinationTasks.splice(destinationIndex, 0, removed)

      dispatch({ type: 'dragWithinColumn', payload: { destinationColumn, destinationTasks } })
    } else {
      await updateTask(parseInt(draggableId), destinationColumn)
      setChangedTask(parseInt(draggableId))
      const sourceTasks = [...state.columns[`${sourceColumn}`].tasks]

      const [removed] = sourceTasks.splice(sourceIndex, 1)
      destinationTasks.splice(destinationIndex, 0, removed)

      dispatch({
        type: 'dragToDifferentColumn',
        payload: { sourceColumn, destinationColumn, sourceTasks, destinationTasks }
      })
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

  // useEffect(() => {
  //   console.log(state.columns)
  // }, [state.columns])
  useEffect(async () => {
    if (changedTask >= 0) {
      const task = await getTask(changedTask)
      const newTasks = [...tasks]
      const index = newTasks.findIndex(t => t.task_id === task.task_id)
      newTasks.splice(index, 1)
      newTasks.splice(index, 0, task)
      setTasks(newTasks)
    }
    setChangedTask(-1)
  }, [changedTask])

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