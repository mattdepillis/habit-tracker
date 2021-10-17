import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Card, Badge } from 'react-bootstrap'

const ItemText = styled(Card.Text)`
  display: inline-block;
  margin: 1px;
  font-size: .8em;
`

const StyledBadge = styled(Badge)`
  background-color: ${props => props.backgroundColor};
  color: white;
  font-size: .8em;
  margin: 1px;
  display: inline-block;
`

const renderBadges = (array, name, task) => {
  const isString = task !== undefined

  return (
    <Fragment>
      {!isString &&
        <ItemText>{name}</ItemText>
      }
      {array.map((item, i) => (
        <Fragment key={i}>
          {isString &&
            <Fragment>
              <ItemText>{item.replace('_', ' ')}</ItemText>
              <StyledBadge
                backgroundColor={task[`${item}_label_color`]}
              >
                {task[`task_${item}`]}
              </StyledBadge>
              <br />
            </Fragment> 
          }
          {!isString &&
            <StyledBadge
              backgroundColor={item[`${name}_label_color`]}
            >
              {item[`${name}_name`]}
            </StyledBadge>
          }
        </Fragment>
      ))}
      {!isString && <br />}
    </Fragment>
  )
}

const TaskCard = ({
  task
}) => {
  console.log(task)
  return (
    <Card style={{ width: '18rem' }}>
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
  )
}

export default TaskCard