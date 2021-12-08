import React, { useState, useEffect} from 'react'
import styled from 'styled-components'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { DragDropContext } from 'react-beautiful-dnd'

import { fetchData } from '../utils/api'
import Column from './Column'

const StyledContainer = styled(Container)`
  background-color: white;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 3px solid #343a40;
`

// TODO: play with the container. This should be a grid and
// TODO: container should be scrollable and have a border
// TODO: create drag and drop functionality for cards with react-beautiful-dnd
const BoardContainer = ({
  showModal
}) => {
  const [tasks, setTasks] = useState([])

  const setTaskList = async () => setTasks(await fetchData('/tasks'))

  const onDragEnd = (result) => {
    const reorderedTasks = [...tasks]
    // console.log(result.source.index)
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed)
    // console.log(reorderedTasks)
    setTasks(reorderedTasks)
  }

  useEffect(() => {
    setTaskList()
  }, [])

  useEffect(() => {
    if (!showModal) setTaskList()
  }, [showModal])

  useEffect(() => {
    console.log(tasks)
  }, [tasks])

  return (
    <Container>
      <StyledContainer fluid>
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <Column
            tasks={tasks}
          />
        </DragDropContext>
      </StyledContainer>
    </Container>
  )
}

export default BoardContainer