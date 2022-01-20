/* eslint-disable react/no-children-prop */
import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import CodeBlock from './CodeBlock'

const MarkdownWrapper = styled.div`
  background-color: #fcfbf8;
  border-radius: 5px;
  margin: 5px 0 0 0;
  padding: 5px;
`

const MarkdownBox = ({ value }) => (
  <MarkdownWrapper>
    <ReactMarkdown
      children={value || '**Write some markdown to test me out!**'}
      components={{
        code: ({inline, className, children, ...props}) => (
          <CodeBlock
            inline={inline}
            className={className}
            children={children}
            props={props}
          />
        )
      }}
    />
  </MarkdownWrapper>
)

export default MarkdownBox
