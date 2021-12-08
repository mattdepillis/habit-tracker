import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Card, Badge } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'

const ItemText = styled(Card.Text)`
  display: inline-block;
  margin: 1px;
  font-size: .8em;
`

const StyledBadge = styled(Badge)`
  background-color: ${props => props.backgroundColor};
  color: white;
  font-size: .85em;
  margin: 1px;
  display: inline-block;
`

const StyledIcon = styled.i`
  font-size: 1.4em;
  margin: 1px;
  display: inline-block;
  vertical-align: middle;
`

const renderStyledIcon = classname =>
  <StyledIcon className={classname}></StyledIcon>

const renderIcon = (name) => {
  switch (name) {
    case 'status':
      return renderStyledIcon('bi-ui-checks')
    case 'type':
      return renderStyledIcon('bi-file-earmark-arrow-up-fill')
    case 'priority':
      return renderStyledIcon('bi-exclamation-triangle-fill')
    case 'product manager':
      return renderStyledIcon('bi-diagram-2')
    case 'tag':
      return renderStyledIcon('bi-tag')
    case 'engineer':
      return renderStyledIcon('bi-terminal-fill')
    default:
      return <ItemText>{name}</ItemText>
  }
}

const renderBadges = (array, name, task) => {
  const isString = task !== undefined

  return (
    <Fragment>
      <div>
        {!isString &&
            renderIcon(name)
        }

        {array.map((item, StyledIcon) => (
          <Fragment key={StyledIcon}>
            {isString
              ? (<Fragment>
                  {renderIcon(item.replace('_', ' '))}
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

const TaskCard = ({
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
        style={{ width: '18rem' }}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <Card.Body>
          <Card.Title>{task.task_name}</Card.Title>
          {renderBadges(['status', 'type', 'priority', 'product_manager'], undefined, task)}
          {renderBadges(task.task_tags, 'tag', undefined)}
          {renderBadges(task.task_engineers, 'engineer', undefined)}
          <Card.Text>
            {task.task_description}
          </Card.Text>
        </Card.Body>
      </Card>
    )}
  </Draggable>
)

export default TaskCard