import React, { useEffect, useState } from 'react'
import { Form, Tabs, Tab } from 'react-bootstrap'

import SelectQuestion from './SelectQuestion'
import MultiSelectQuestion from './MultiSelectQuestion'
import MarkdownBox from '../markdown/MarkdownBox'
import { handleChange } from '../../utils/utils'

const textQ = (id, setState, priorValue) => {
  const [value, setValue] = useState(priorValue || '')
  return (
    <Form.Control
      required
      type="text"
      value={value}
      onChange={(e) => {
        handleChange(setState, id, e.target.value)
        setValue(e.target.value)
      }}
    />
  )
}

const textareaQ = (id, setState, priorValue) => {
  const [activeKey, setActiveKey] = useState('write')
  const [value, setValue] = useState(priorValue || ``)

  return (
    <Tabs
      activeKey={activeKey}
      onSelect={key => setActiveKey(key)}
    >
      <Tab
        eventKey='write'
        title='Write'
      >
        <Form.Control
          required
          as="textarea"
          value={value}
          onChange={(e) => {
            handleChange(setState, id, e.target.value)
            setValue(e.target.value)
          }}
        />
      </Tab>
      <Tab
        eventKey='preview'
        title='Markdown Preview'
      >
        <MarkdownBox
          value={value}
        />
      </Tab>
    </Tabs>
  )
}

const dateQ = (id, setState, priorValue) => {
  const [value, setValue] = useState(priorValue || '')
  useEffect(() => {
    console.log('dateQ value', value)
  }, [value])
  return (
    <Form.Control
      required
      type="date"
      value={value}
      onChange={(e) => {
        handleChange(setState, id, e.target.value)
        setValue(e.target.value)
      }}
    />
  )
}

const singleSelect = (id, path, table, setAnswer, value) => (
  <SelectQuestion
    required
    id={id}
    path={path}
    table={table}
    setAnswer={setAnswer}
  />
)

const multiSelect = (id, path, table, setAnswer, value) => (
  <MultiSelectQuestion
    required
    id={id}
    path={path}
    table={table}
    setAnswer={setAnswer}
  />
)

export const renderQuestion = (id, type, path, table, setAnswer, value) => {
  // console.log('vrq', value)
  switch (type) {
    case 'text':
      return textQ(id, setAnswer, value)
    case 'textarea':
      return textareaQ(id, setAnswer, value)
    case 'date':
      return dateQ(id, setAnswer, value)
    case 'singleSelect':
      return singleSelect(id, path, table, setAnswer, value)
    case 'multiSelect':
      return multiSelect(id, path, table, setAnswer, value)
    default:
      return null
  }
}
