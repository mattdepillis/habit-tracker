import React, { useState, useEffect } from 'react'
import { Form, Col, Row } from 'react-bootstrap'

import { renderQuestion } from './FormQuestions/QuestionFormats'
import { formSections } from './FormQuestions/FormQuestions'
import { cleanFormAnswers } from '../utils/utils'

const formatSectionQuestions = (section, questions, setAnswer) => {
  if (questions.length > 2) console.log('too long', section)
  return (
    <Row>
      {questions.map(({ id, label, type, path, table }) => (
        <Form.Group key={id} as={Col}>
          <Form.Label>{label}</Form.Label>
          {renderQuestion(id, type, path, table, setAnswer)}
        </Form.Group>
      ))}
    </Row>
  )
}

const AddTaskForm = ({
  setModalFormState
}) => {
  const [answer, setAnswer] = useState({})
  const [formAnswers, setFormAnswers] = useState({})

  useEffect(() => {
    if (Object.keys(answer).length > 0) {
      const obj = cleanFormAnswers(answer, { ...formAnswers })
      setFormAnswers({ ...obj })
    }
  }, [answer])

  useEffect(() => {
    setModalFormState(formAnswers)
  }, [formAnswers])

  return (
    <Form>
      {Array.from(formSections).map(([sectionName, questions]) => (
          formatSectionQuestions(sectionName, questions, setAnswer)
      ))}
    </Form>
  )
}

export default AddTaskForm
