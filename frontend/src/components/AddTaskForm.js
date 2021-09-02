import React from 'react'
import { Form, Col } from 'react-bootstrap'

import { renderQuestion } from './FormQuestions/QuestionFormats'
import FormQuestions from './FormQuestions/FormQuestions'

const questionFormat = ({ id, label, type, path, table }) => {
  return (
  <Form.Group as={Col}>
    <Form.Label>{label}</Form.Label>
    {renderQuestion(id, type, path, table)}
  </Form.Group>
)}

// TODO: figure out how to log all data to the console on form submission --> as a precursor to actual submission
// TODO: figure out how to post to junction tables on task creation

const AddTaskForm = () => {
  // TODO: manage high-level form state here, like answers to each question, for submission processing
  return (
    <Form>
      {FormQuestions.map((question) => (
        questionFormat(question)
      ))}
    </Form>
  )
}

export default AddTaskForm
