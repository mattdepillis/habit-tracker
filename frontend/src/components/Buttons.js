import React from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'

const StyledButton = styled(Button)`
  display: flex;
  align-self: flex-end;
  max-height: 50px;
  min-width: 95px;
  margin: 20px 10px 0 0px;
  border: ${props => props.border ? '1px solid black' : 'none'}
`

export const AddButton = ({ onClick }) => 
  <StyledButton
    variant="success"
    onClick={onClick}
    border
  >
    Add Task
  </StyledButton>

export const PropertiesButton = ({ onClick }) =>
  <StyledButton
    variant="light"
    onClick={onClick}
    border
  >
    Properties
  </StyledButton>