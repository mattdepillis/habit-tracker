/* eslint-disable react/no-children-prop */
import React from 'react'
import ReactMarkdown from 'react-markdown'

import CodeBlock from './CodeBlock'
import { MarkdownWrapper } from '../../styles/MarkdownBox'

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
