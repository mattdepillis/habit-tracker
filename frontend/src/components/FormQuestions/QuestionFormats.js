import React, { useEffect, useState } from 'react'
import { Form, Tabs, Tab } from 'react-bootstrap'

import SelectQuestion from './SelectQuestion'
import MultiSelectQuestion from './MultiSelectQuestion'
import MarkdownBox from '../markdown/MarkdownBox'
import { handleChange } from '../../utils/utils'

const textQ = (id, setState) => (
  <Form.Control
    required
    type="text"
    onChange={(e) => handleChange(setState, id, e.target.value)}
  />
)

const textareaQ = (id, setState) => {
  const [activeKey, setActiveKey] = useState('write')
  const [value, setValue] = useState(``)

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

const dateQ = (id, setState) => (
  <Form.Control
    required
    type="date"
    onChange={(e) => handleChange(setState, id, e.target.value)}
  />
)

const singleSelect = (id, path, table, setAnswer) => (
  <SelectQuestion
    required
    id={id}
    path={path}
    table={table}
    setAnswer={setAnswer}
  />
)

const multiSelect = (id, path, table, setAnswer) => (
  <MultiSelectQuestion
    required
    id={id}
    path={path}
    table={table}
    setAnswer={setAnswer}
  />
)

export const renderQuestion = (id, type, path, table, setAnswer) => {
  switch (type) {
    case 'text':
      return textQ(id, setAnswer)
    case 'textarea':
      return textareaQ(id, setAnswer)
    case 'date':
      return dateQ(id, setAnswer)
    case 'singleSelect':
      return singleSelect(id, path, table, setAnswer)
    case 'multiSelect':
      return multiSelect(id, path, table, setAnswer)
    default:
      return null
  }
}
