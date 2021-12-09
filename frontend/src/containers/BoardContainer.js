import React, { useState, useEffect, useReducer } from 'react'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import { DragDropContext } from 'react-beautiful-dnd'

import { fetchData } from '../utils/api'
import Column from './Column'

const StyledContainer = styled(Container)`
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0;
  border-radius: 10px;
`

const ColumnContainer = styled(Container)`
  display: flex;
`

/*
  TODO: get ordering within the columns correct -- use the reducer function for this
  TODO: enable dnd into other columns
    ! add the task to a different column and remove it from the current
  TODO: make the entire container scrollable
*/

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'setState':
      const { columns, tasks } = payload

      const newColumns = {}
      columns.forEach(column => {
        newColumns[column.column_name] = {
          columnColor: column.column_color,
          tasks: []
        }
      })

      tasks.forEach(task => newColumns[task.task_status].tasks.push(task))

      return { ...state, columns: newColumns }
    default:
      return { ...state }
  }
}

const BoardContainer = ({
  showModal
}) => {
  const [columns, setColumns] = useState([])
  const [tasks, setTasks] = useState([])

  const initialState = { columns: {} }
  const [state, dispatch] = useReducer(reducer, initialState)

  const setKanbanColumns = async () => setColumns(await fetchData('/column'))
  const setTaskList = async () => setTasks(await fetchData('/tasks'))

  const onDragEnd = (result) => {
    const reorderedTasks = [...tasks]
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed)
    setTasks(reorderedTasks)
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
              title={key}
              color={value.columnColor}
              tasks={value.tasks}
            />
          ))}
        </ColumnContainer>
      </DragDropContext>
    </StyledContainer>
  )
}

export default BoardContainer