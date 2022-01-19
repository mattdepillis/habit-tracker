/* eslint-disable react/no-children-prop */
import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const MarkdownWrapper = styled.div`
  background-color: #fcfbf8;
  border-radius: 5px;
  margin: 5px 0 0 0;
  padding: 10px;
  white-space: pre-wrap;
`

// TODO: style bullet list spacing
// TODO: componentize SyntaxHighlighter
const MarkdownBox = ({ value }) => (
  <MarkdownWrapper>
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
              customStyle={{ 'border-radius': '5px' }}
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
  </MarkdownWrapper>
)

export default MarkdownBox
