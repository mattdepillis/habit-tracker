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

// TODO: format all questionIds to fit the tables in postgres
// TODO: figure out how to post to junction tables on task creation

const AddTaskForm = () => {
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
    console.log(formAnswers)
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
