import React, { useEffect, useState } from 'react'

import { Modal, Button } from 'react-bootstrap'
import { postTask } from '../utils/api'
import AddTaskForm from './AddTaskForm'

const AddTaskModal = ({ show, onHide }) => {
  const [formComplete, setFormComplete] = useState(false)
  const [formAnswers, setFormAnswers] = useState({})

  // TODO: while postTask in flight, have submitting = true
  // ! while submitting, a spinner should appear either in the button or on screen generally
  // * after the promise has been resolved, then close the modal and reload the page

  useEffect(() => {
    if (Object.keys(formAnswers).length === 9 && !formComplete) setFormComplete(true)
    if (Object.keys(formAnswers).length < 9 && formComplete) setFormComplete(false)
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
          onClick={async () => await postTask(formAnswers)}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddTaskModal