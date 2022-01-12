import React from 'react'
import { Spinner } from 'react-bootstrap'
import { StyledButton, UnstyledButton } from '../styles/Buttons'

export const AddButton = ({ onClick }) => 
  <StyledButton
    variant="success"
    onClick={onClick}
  >
    Add Task
  </StyledButton>

export const DeleteButton = ({ submitting, onClick }) =>
  <StyledButton
    variant="danger"
    onModal
    onClick={onClick}
  >
    {submitting
      ? <Spinner
          animation="border"
          variant="light" 
        />
      : 'Delete'
    }
  </StyledButton>

export const CancelButton = ({ onClick }) =>
  <StyledButton
    variant="secondary"
    onModal
    onClick={onClick}
  >
    Cancel
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
