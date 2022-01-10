import React from 'react'
import { StyledButton, UnstyledButton } from '../styles/Buttons'

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

export const TrashButton = ({ ...props }) =>
  <UnstyledButton {...props} >
    <i { ...props } className={'bi bi-trash'}></i>
  </UnstyledButton>
