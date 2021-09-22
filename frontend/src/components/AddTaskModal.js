import React, { useEffect, useState } from 'react'

import { Modal, Button } from 'react-bootstrap'
import { postTask } from '../utils/api'
import AddTaskForm from './AddTaskForm'

const AddTaskModal = ({ show, onHide }) => {
  const [formComplete, setFormComplete] = useState(false)
  const [formAnswers, setFormAnswers] = useState({})

  useEffect(() => {
    if (Object.keys(formAnswers).length === 9 && !formComplete) setFormComplete(true)
    if (Object.keys(formAnswers).length < 9 && formComplete) setFormComplete(false)
    console.log(formAnswers)
  }, [formAnswers])

  return (
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
          Add a Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddTaskForm setModalFormState={setFormAnswers} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
        >
          Cancel
        </Button>
        <Button
          variant="success"
          type="submit"
          disabled={!formComplete}
          onClick={() => postTask(formAnswers)}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddTaskModal