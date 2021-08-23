import React from 'react'

import { Form, Col } from 'react-bootstrap'
// import MultiTypeaheadQuestion from  './MultiTypeaheadQuestion'
import SingleTypeaheadQuestion from './SingleTypeaheadQuestion'

const AddTaskForm = () => {
  return (
    <Form>
      <Form.Group as={Col}>
        <Form.Label>Task Name</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Status</Form.Label>
        <SingleTypeaheadQuestion
          id="taskStatusTypeahead"
          path="/status"
          placeholder="Choose an option or create one"
          table="status"
        />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Type</Form.Label>
        <SingleTypeaheadQuestion
          id="taskTypeTypeahead"
          path="/type"
          placeholder="Choose an option or create one"
          table="type"
        />
      </Form.Group>
    </Form>
  )
}

export default AddTaskForm
