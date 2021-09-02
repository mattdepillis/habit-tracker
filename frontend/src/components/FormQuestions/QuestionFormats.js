import React from 'react'
import { Form } from 'react-bootstrap'

import SelectQuestion from './SelectQuestion'
import MultiSelectQuestion from './MultiSelectQuestion'

const textQ = (id) => (
  <Form.Control
    required
    type="text"
    id={id}
  />
)

const singleSelect = (id, path, table) => (
  <SelectQuestion
    required
    id={id}
    path={path}
    table={table}
  />
)

const multiSelect = (id, path, table) => (
  <MultiSelectQuestion
    required
    id={id}
    path={path}
    table={table}
  />
)

export const renderQuestion = (id, type, path, table) => {
  switch (type) {
    case 'text':
      return textQ(id)
    case 'singleSelect':
      return singleSelect(id, path, table)
    case 'multiSelect':
      return multiSelect(id, path, table)
    default:
      return null
  }
}
