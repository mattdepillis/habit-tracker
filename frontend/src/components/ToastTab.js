import React from 'react'
import styled from 'styled-components'
import Toast from 'react-bootstrap/Toast'
import Switch from '@mui/material/Switch'

const Header = styled(Toast.Header)`
  display: flex;
  justify-content: space-between;
`

const PropertyContainer = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 100%;
  justify-content: space-between;
`

const Label = styled.h1`
  align-self: center;
  font-size: 1em;
  margin: 0 100px 0 5px;
`

const PropertyToast = styled(Toast)`
  background-color: white;
`

/*
  TODO: overall toast styling
  TODO: pass the questions down to toast
  TODO: create a toggle for each question
*/
const ToastTab = ({
  className,
  show,
  onHide,
  properties
}) => {
  /* 
    TODO: handle state of which properties to show.
      * can create an array of properties to show
        * default properties -- TBD
      * pass state up to the homepage component
      * homepage component will pass state down to the TaskCardCover
      * when a property is shown, color the text green?
  */
  console.log(properties)
  return (
    <PropertyToast className={className} show={show} onClose={onHide}>
      <Header>
        <strong className="me-auto">Properties</strong>
      </Header>
      <Toast.Body>
        {properties
          .filter(p => ['Description', 'Name'].indexOf(p.label) < 0).map((property) => (
          <PropertyContainer>
            <Label key={property.id}>
              {property.label}
            </Label>
            <Switch />
          </PropertyContainer>
        ))}
      </Toast.Body>
    </PropertyToast>
  )
}

export default ToastTab