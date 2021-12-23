import React, { useEffect, useState } from 'react'

import { Modal, Button, Spinner } from 'react-bootstrap'
import { postData } from '../utils/api'
import AddTaskForm from './AddTaskForm'

const AddTaskModal = ({
  show,
  onHide 
}) => {
  const [formComplete, setFormComplete] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formAnswers, setFormAnswers] = useState({})

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
          onClick={async (e) => {
            e.preventDefault()
            setSubmitting(true)
            await postData('/tasks', formAnswers)
            setSubmitting(false)
            onHide()
          }}
        >
          {submitting
            ? <Spinner
                animation="border"
                variant="light" 
              />
            : 'Submit'
          }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddTaskModal