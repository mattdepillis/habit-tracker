import React from 'react'
import Button from 'react-bootstrap/Button'

const AddButton = ({ onClick }) => {

  return (
    <Button variant="success" onClick={onClick}>Add Task</Button>
  )
}

export default AddButton