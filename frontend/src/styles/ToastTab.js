import styled from 'styled-components'
import Toast from 'react-bootstrap/Toast'

export const PropertyToast = styled(Toast)`
  background-color: white;
`

export const Header = styled(Toast.Header)`
  display: flex;
  justify-content: space-between;
`

export const PropertyContainer = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 100%;
  justify-content: space-between;
`

export const Label = styled.h1`
  align-self: center;
  font-size: 1em;
  margin: 0 100px 0 5px;
`
