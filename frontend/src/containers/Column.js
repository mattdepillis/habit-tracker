import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import {
  ColumnHeader,
  ColumnContainer,
  CardContainer,
  Title,
  Counter
} from '../styles/Column'
import TaskCardCover from '../components/TaskCardCover'


const Column = ({
  title,
  color,
  tasks,
  width,
  length,
  showProperties
}) => {
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