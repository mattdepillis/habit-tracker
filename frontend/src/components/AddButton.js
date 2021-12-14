import React from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'

const StyledButton = styled(Button)`
  margin: 20px 0 0 0px;
`

const AddButton = ({ onClick }) => {

  return (
    <StyledButton variant="success" onClick={onClick}>Add Task</StyledButton>
  )
}

export default AddButton