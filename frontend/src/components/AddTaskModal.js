import React, { useEffect, useState } from 'react'

import { Modal, Button } from 'react-bootstrap'
import AddTaskForm from './AddTaskForm'

// TODO: write a post function to post the completed task to the db
// TODO: write a post function for the join tables

const AddTaskModal = ({ show, onHide }) => {
  let formComplete = false
  const [formAnswers, setFormAnswers] = useState({})

  useEffect(() => {
    if (Object.keys(formAnswers).length === 9) formComplete = true
    console.log('formComplete', formComplete)
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
        <Modal.Title>Add a Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddTaskForm
          setModalFormState={setFormAnswers}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="success" type="submit">Submit</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddTaskModal