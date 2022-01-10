import React from 'react'
import styled from 'styled-components'

import { Card, Badge } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'
import { createPropertyArray } from '../utils/utils'
import DeleteTaskModal from './modals/DeleteTaskModal'

const StyledBadge = styled(Badge)`
  background-color: ${props => props.backgroundColor || '#36454f'};
  color: white;
  font-size: .85em;
  font-weight: normal;
  margin: 1px;
  display: inline-block;
`

const CardTitle = styled(Card.Title)`
  font-size: 1em;
  display: flex;
  justify-content: space-between;
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
      key={task?.task_id || i}
      draggableId={task?.task_id.toString()}
      index={i}
    >
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card.Body>
            <CardTitle>
              {task.task_name}
              <DeleteTaskModal />
            </CardTitle>
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