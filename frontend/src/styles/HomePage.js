import styled from 'styled-components'
import ToastTab from '../components/ToastTab'

export const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  position: relative;
  width: fit-content;
  max-height: 50px;
  margin: 10px 0 10px 0;
  z-index: 2;
`

export const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: fit-content;
  max-height: 50px;
  align-items: center;
  padding: 3px;
`

export const ToastWrapper = styled.div`
  position: relative;
  padding-top: 5px;
  width: fit-content;
`

export const BoardContainerWrapper = styled.div`
  position: relative;
  margin-top: 10px;
`

export const PropertyToast = styled(ToastTab)`
  position: relative;
  float: right;
`