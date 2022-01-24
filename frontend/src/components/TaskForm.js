import React, { useState, useEffect, Fragment } from 'react'
import { Form, Col, Row } from 'react-bootstrap'

import { renderQuestion } from './FormQuestions/QuestionFormats'
import FormQuestions from './FormQuestions/FormQuestions'
import { cleanFormAnswers, splitFlatArrayIntoChildren } from '../utils/utils'
import { FORM_SECTIONS } from '../utils/constants'

const formatSectionQuestions = (questions, setAnswer) => {
  const sectionRows = questions.length > 2
    ? splitFlatArrayIntoChildren([...questions], 2)
    : [questions]

  return (
    <Fragment>
      {sectionRows.map((row, i) => (
        <Row key={i}>
          {row.map(({ id, label, type, path, table }) => (
            <Form.Group key={id} as={Col}>
              <Form.Label>{label}</Form.Label>
              {renderQuestion(id, type, path, table, setAnswer)}
            </Form.Group>
          ))}
        </Row>
      ))}
    </Fragment>
  )
}

const TaskForm = ({
  setModalFormState
}) => {
  const [answer, setAnswer] = useState({})
  const [formAnswers, setFormAnswers] = useState({})

  // for each "section" of the form, create an array of its child questions
  const sectionQuestions = FORM_SECTIONS.map(section =>
    Object.values(FormQuestions).filter(question => question.section === section))

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
      {sectionQuestions.map(questions => (
        formatSectionQuestions(questions, setAnswer)
      ))}
    </Form>
  )
}

export default TaskForm
