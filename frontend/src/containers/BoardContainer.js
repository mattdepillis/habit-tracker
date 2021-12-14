import React, { useState, useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'

import { fetchData } from '../utils/api'
import { reducer } from '../utils/dnd'
import Column from './Column'

const StyledContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 100%;
`

const ColumnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`

const BoardContainer = ({
  showModal
}) => {
  const [columns, setColumns] = useState([])
  const [tasks, setTasks] = useState([])

  const initialState = { columns: {} }
  const [state, dispatch] = useReducer(reducer, initialState)

  const setKanbanColumns = async () => setColumns(await fetchData('/column'))
  const setTaskList = async () => setTasks(await fetchData('/tasks'))

  /*
    TODO: when moved to a new column, API call to replace the status of the task
  */
  const onDragEnd = (result) => {
    const {
      source: { index: sourceIndex, droppableId: sourceColumn },
      destination: { index: destinationIndex, droppableId: destinationColumn }
    } = result

    const destinationTasks = [...state.columns[`${destinationColumn}`].tasks]

    if (sourceColumn === destinationColumn) {
      const [removed] = destinationTasks.splice(sourceIndex, 1)
      destinationTasks.splice(destinationIndex, 0, removed)

      dispatch({ type: 'dragWithinColumn', payload: { destinationColumn, destinationTasks } })
    } else {
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

  return (
    <StyledContainer fluid>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <ColumnContainer fluid>
          {Object.entries(state.columns).map(([key, value]) => (
            <Column
              key={key}
              title={key}
              color={value.columnColor}
              tasks={value.tasks}
              width={(100 / columns.length - 1)}
            />
          ))}
        </ColumnContainer>
      </DragDropContext>
    </StyledContainer>
  )
}

export default BoardContainer