import React, { useEffect, useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

import { postData } from '../../utils/api'
import TaskForm from '../TaskForm'

/*
  TODO: refactor the core modal JSX into separate component.
  TODO: add support for both Add and Edit modes -- use a param?
*/
const TaskModal = ({
  show,
  setLoading,
  onHide,
  task
}) => {
  const edit = !!task
  const submitButtonText = edit ? 'Save Changes' : 'Create'

  const [formComplete, setFormComplete] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formAnswers, setFormAnswers] = useState({})

  const submitForm = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await postData('/tasks', formAnswers)
    setSubmitting(false)
    setLoading(true)
    onHide()
  }

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
          {edit ? `${task.task_name}` : 'Add Task'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TaskForm
          setModalFormState={setFormAnswers}
          task={task}
        />
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
          onClick={async (e) => await submitForm(e)}
        >
          {submitting
            ? <Spinner
                animation="border"
                variant="light" 
              />
            : `${submitButtonText}`
          }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TaskModal
