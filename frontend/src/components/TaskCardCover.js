import React from 'react'
import styled from 'styled-components'
import { Card, Badge } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'

import { createPropertyArray } from '../utils/utils'

const StyledBadge = styled(Badge)`
  background-color: ${props => props.backgroundColor || 'dodgerblue'};
  color: white;
  font-size: .85em;
  font-weight: normal;
  margin: 1px;
  display: inline-block;
`

const CardTitle = styled(Card.Title)`
  font-size: 1em;
`

const renderBadges = (array) => (
  <div>
    {array.map((item, i) => (
      <StyledBadge
        key={i} 
        backgroundColor={item.color}
      >
        {item.name}
      </StyledBadge>
    ))}
  </div>
)

const TaskCardCover = ({
  task,
  i,
  showProperties
}) => {
  const properties = showProperties.map(p => p.toLowerCase().replace(' ', '_'))
  return (
    <Draggable
      key={task.task_id}
      draggableId={task.task_id.toString()}
      index={i}
    >
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card.Body>
            <CardTitle>{task.task_name}</CardTitle>
            {properties.map(property => {
              const propertyArray = createPropertyArray(task, property)
              return (
                renderBadges(propertyArray)
              )
            })}
          </Card.Body>
        </Card>
      )}
    </Draggable>
  )
}

export default TaskCardCover