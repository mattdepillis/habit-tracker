import React from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'

const StyledButton = styled(Button)`
  display: flex;
  align-self: flex-end;
  max-height: 50px;
  min-width: 95px;
  margin: 20px 10px 0 0px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`

export const AddButton = ({ onClick }) => 
  <StyledButton
    variant="success"
    onClick={onClick}
  >
    Add Task
  </StyledButton>

export const PropertiesButton = ({ onClick }) =>
  <StyledButton
    onClick={onClick}
  >
    Properties
  </StyledButton>
