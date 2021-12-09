import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

import TaskCard from '../components/TaskCard'

const ColumnContainer = styled.div`
  background-color: white;
  margin: 8px;
  border-radius: 10px;
  width: 25%;
  padding: 5px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`

const CardContainer = styled.div`
  margin: 0px 2px 10px 2px;
`

const Title = styled.h3`
  padding: 8px;
  color: ${props => props.color || 'black'}
`

const Column = ({
  title,
  color,
  tasks
}) => {
  return (
    <ColumnContainer>
      <Title color={color}>{title}</Title>
      <Droppable droppableId={title}>
        {(provided) => (
          <CardContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, i) => (
              <TaskCard
                key={i}
                task={task}
                i={i}
              />
            ))}
            {provided.placeholder} 
          </CardContainer>
        )}
      </Droppable>
    </ColumnContainer>
  )
}

export default Column