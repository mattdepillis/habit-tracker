import styled from 'styled-components'
import Button from 'react-bootstrap/Button'

export const StyledButton = styled(Button)`
  display: flex;
  align-self: flex-end;
  max-height: 50px;
  width: fit-content;
  min-width: fit-content;
  margin: 20px 10px 0 0px;
  font-size: ${props => props.onModal ? '.8em' : '1em'};
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`

export const UnstyledButton = styled.button`
  border: none;
  width: fit-content;
  background-color: white;
`