/* eslint-disable react/no-children-prop */
import React, { useState } from 'react'
import { Form, Tabs, Tab } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

import rehypeRaw from 'rehype-raw'
import styled from 'styled-components'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

import SelectQuestion from './SelectQuestion'
import MultiSelectQuestion from './MultiSelectQuestion'
import { handleChange } from '../../utils/utils'

const textQ = (id, setState) => (
  <Form.Control
    required
    type="text"
    onChange={(e) => handleChange(setState, id, e.target.value)}
  />
)

const MarkdownBox = styled.div`
  background-color: #fcfbf8;
  border-radius: 5px;
  margin: 5px 0 0 0;
  padding: 10px;
  white-space: pre-wrap;
`

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
        <MarkdownBox>
          <ReactMarkdown
            children={value || '**Write some markdown to test me out!**'}
            rehypePlugins={[[rehypeRaw]]}
            components={{
              code({inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          />
        </MarkdownBox>
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
