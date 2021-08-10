import React from 'react'
// import styled from 'styled-components'

import { Modal, Button } from 'react-bootstrap'
import AddTaskForm from './AddTaskForm'

const AddTaskModal = ({ show, onHide }) => {

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
        <AddTaskForm />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="success" type="submit">Submit</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddTaskModal