import React from 'react'

import { Form, Col } from 'react-bootstrap'
import TypeaheadQuestion from  './TypeaheadQuestion'
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
        <TypeaheadQuestion
          id="taskStatusTypeahead"
          path="/status"
          placeholder="Choose an option or create one"
          table="status"
        />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Status Test</Form.Label>
        <SingleTypeaheadQuestion
          id="singleTypeahead"
          path="/status"
          placeholder="single..."
          table="status"
        />
      </Form.Group>
    </Form>
  )
}

export default AddTaskForm
