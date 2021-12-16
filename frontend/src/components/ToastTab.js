import React from 'react'
import styled from 'styled-components'
import Toast from 'react-bootstrap/Toast'

const Header = styled(Toast.Header)`
  display: flex;
  justify-content: space-between;
`

/*
  TODO: overall toast styling
  TODO: pass the questions down to toast
  TODO: create a toggle for each question
*/
const ToastTab = ({
  className,
  show,
  onHide
}) => {
  return (
    <Toast className={className} show={show} onClose={onHide}>
      <Header>
        <strong className="me-auto">Properties</strong>
      </Header>
      <Toast.Body>
        Woohoo, you're reading this text in a Toast!
        <br />
        let me tell you a little bit about myself...
      </Toast.Body>
    </Toast>
  )
}

export default ToastTab