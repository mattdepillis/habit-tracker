import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Card, Badge } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'

const StyledBadge = styled(Badge)`
  background-color: ${props => props.backgroundColor};
  color: white;
  font-size: .85em;
  font-weight: normal;
  margin: 1px;
  display: inline-block;
`

const CardTitle = styled(Card.Title)`
  font-size: 1em;
`

const renderBadges = (array, name, task) => {
  const isString = task !== undefined

  return (
    <Fragment>
      <div>
        {array.map((item, i) => (
          <Fragment key={i}>
            {isString
              ? (<Fragment>
                  <StyledBadge
                    backgroundColor={task[`${item}_label_color`]}
                  >
                    {task[`task_${item}`]}
                  </StyledBadge>
                  <br />
                </Fragment>)
              : (<StyledBadge
                  backgroundColor={item[`${name}_label_color`]}
                >
                  {item[`${name}_name`]}
                </StyledBadge>)
            }
          </Fragment>
        ))}
        {!isString && <br />}
      </div>
    </Fragment>
  )
}

const TaskCardCover = ({
  task,
  i
}) => (
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
          {renderBadges(['status', 'type', 'priority', 'product_manager', 'deadline'], undefined, task)}
          {renderBadges(task.task_tags, 'tag', undefined)}
          {renderBadges(task.task_engineers, 'engineer', undefined)}
        </Card.Body>
      </Card>
    )}
  </Draggable>
)

export default TaskCardCover