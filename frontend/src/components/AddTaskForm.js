import React from 'react'
import { Form, Col } from 'react-bootstrap'

import SelectQuestion from './FormQuestions/SelectQuestion'
import MultiSelectQuestion from './FormQuestions/MultiSelectQuestion'

// TODO: build the questions for the rest of the form items
// TODO: figure out how to post data to union tables

const AddTaskForm = () => {
  return (
    <Form>
      <Form.Group as={Col}>
        <Form.Label>Task Name</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Status</Form.Label>
        <SelectQuestion
          id="statusSelect"
          path="/status"
          table="status"
        />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Tags</Form.Label>
        <MultiSelectQuestion
          required
          id="taskTypeTypeahead"
          path="/tag"
          table="tag"
        />
      </Form.Group>
    </Form>
  )
}

export default AddTaskForm
