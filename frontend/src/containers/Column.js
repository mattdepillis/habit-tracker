import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

import TaskCard from '../components/TaskCard'

const Container = styled.div`
  margin: 8px;
  border: 1px solid black;
  border-radius: 2px;
  width: 300px;
`

const SmallContainer = styled.div`
  margin: 1px;
`

const Title = styled.h3`
  padding: 8px;
`

const Column = ({
  title,
  tasks
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Droppable droppableId={title}>
        {(provided) => (
          <SmallContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, i) => (
              <TaskCard
                task={task}
                i={i}
              />
            ))}
            {provided.placeholder} 
          </SmallContainer>
        )}
      </Droppable>
    </Container>
  )
}

export default Column