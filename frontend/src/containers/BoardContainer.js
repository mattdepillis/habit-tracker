import React, { useState, useEffect} from 'react'
import styled from 'styled-components'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { fetchData } from '../utils/api'
import TaskCard from '../components/TaskCard'

const StyledContainer = styled(Container)`
  background-color: white;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 3px solid #343a40;
`

const BoardContainer = ({
  showModal
}) => {
  const [tasks, setTasks] = useState([])

  const setTaskList = async () => setTasks(await fetchData('/tasks'))

  useEffect(() => {
    setTaskList()
  }, [])

  useEffect(() => {
    if (!showModal) setTaskList()
  }, [showModal])

  return (
    <Container>
      <StyledContainer fluid>
        <Row>
          <Col>Ready</Col>
          <Col>In Progress</Col>
          <Col>Done</Col>
        </Row>
      </StyledContainer>
      {tasks.map((task, i) => (
        <Row key={i}>
          <TaskCard 
            task={task}
          />
        </Row>
      ))}
    </Container>
  )
}

export default BoardContainer