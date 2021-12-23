import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

import TaskCardCover from '../components/TaskCardCover'

const ColumnHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  height: 40px;
  margin: 0 5px 5px 5px;
`

const ColumnContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  width: ${props => props.width || '24'}%;
  padding: 5px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`

const CardContainer = styled.div`
  margin: 0px 2px 10px 2px;
`

const Title = styled.h1`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1.2em;
  color: ${props => props.color || 'black'}
`

const Counter = styled.h1`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1em;
  color: slategrey;
`

const Column = ({
  title,
  color,
  tasks,
  taskOrder,
  width,
  length,
  showProperties
}) => {
  console.log(title, taskOrder)
  return (
    <ColumnContainer
      width={width}
    >
      <ColumnHeader>
        <Title color={color}>{title}</Title>
        <Counter>{length}</Counter>
      </ColumnHeader>
      <Droppable droppableId={title}>
        {(provided) => (
          <CardContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, i) => (
              <TaskCardCover
                key={i}
                task={task}
                i={i}
                showProperties={showProperties}
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