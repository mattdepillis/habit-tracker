import React, { useState } from 'react'
// import styled from 'styled-components'
import { Modal } from 'react-bootstrap'

import { renderBadges } from '../utils/render'
import TaskModal from './modals/TaskModal'

// const ItemText = styled(Card.Text)`
//   display: inline-block;
//   margin: 1px;
//   font-size: .8em;
// `

// const renderIcon = (name) => <ItemText>{name}</ItemText>

/*
  TODO: view state and edit state
*/
// * where to store functions like renderBadges
const TaskCard = ({
  show,
  onHide,
  task
}) => {
  const [edit, setEdit] = useState(false)

  console.log('t', task)
  
  return edit ? (
    <TaskModal />
  ) : (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Add Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>this is the modal for task {task && task.task_id}</p>
      </Modal.Body>
      <Modal.Footer>
        hello world
      </Modal.Footer>
    </Modal>
  )
}

export default TaskCard
