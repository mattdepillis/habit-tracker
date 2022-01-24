import React from 'react'
import { Card } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'

import { createPropertyArray } from '../utils/utils'
import { renderBadges } from '../utils/render'
import { CardTitle } from '../styles/TaskCardCover'
import DeleteTaskModal from './modals/DeleteTaskModal'

const TaskCardCover = ({
  task,
  i,
  showProperties,
  setLoading,
  setTaskIdToDisplay
}) => {
  const properties = showProperties.map(p => p.toLowerCase().replace(' ', '_'))

  return (
    <Draggable
      key={task.task_id || i}
      draggableId={task.task_id.toString()}
      index={i}
    >
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => setTaskIdToDisplay(task.task_id)}
        >
          <Card.Body>
            <CardTitle>
              {task.task_name}
              <DeleteTaskModal
                taskId={task.task_id}
                taskName={task.task_name}
                taskStatus={task.task_status}
                setLoading={setLoading}
              />
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