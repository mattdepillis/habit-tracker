import React, { useState, useEffect } from 'react'
import { Form, Col } from 'react-bootstrap'

import { renderQuestion } from './FormQuestions/QuestionFormats'
import FormQuestions from './FormQuestions/FormQuestions'
import { cleanFormAnswers } from '../utils/utils'

const questionFormat = ({ id, label, type, path, table }, setAnswer) => {
  return (
  <Form.Group as={Col}>
    <Form.Label>{label}</Form.Label>
    {renderQuestion(id, type, path, table, setAnswer)}
  </Form.Group>
)}

const AddTaskForm = ({
  setModalFormState
}) => {
  const [answer, setAnswer] = useState({})
  const [formAnswers, setFormAnswers] = useState({})

  useEffect(() => {
    if (Object.keys(answer).length > 0) {
      let obj = { ...formAnswers }
      obj = cleanFormAnswers(answer, obj)
      setFormAnswers({ ...obj })
    }
  }, [answer])

  useEffect(() => {
    setModalFormState(formAnswers)
  }, [formAnswers])

  return (
    <Form>
      {FormQuestions.map((question) => (
        questionFormat(question, setAnswer)
      ))}
    </Form>
  )
}

export default AddTaskForm
