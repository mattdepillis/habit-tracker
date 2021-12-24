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
  taskOrder,
  width,
  length,
  showProperties
}) => {
  if (title === 'Ready') console.log(title, taskOrder)
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
            {taskOrder.map((taskId, i) => {
              const task = tasks.find(task => task.task_id === taskId)
              if (title === 'Ready') console.log('t', task)
              return (
                <TaskCardCover
                  key={i}
                  task={task}
                  i={i}
                  showProperties={showProperties}
                />
              )
            })}
            {provided.placeholder} 
          </CardContainer>
        )}
      </Droppable>
    </ColumnContainer>
  )
}

export default Column