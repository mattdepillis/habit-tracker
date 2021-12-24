import React from 'react'
import Toast from 'react-bootstrap/Toast'
import Switch from '@mui/material/Switch'

import {
  PropertyToast,
  Header,
  PropertyContainer,
  Label
} from '../styles/ToastTab'


const ToastTab = ({
  className,
  show,
  onHide,
  properties,
  showProperties,
  setShowProperties
}) => {

  // * modify the array of properties to show and return to parent homepage
  const handleChange = (label, checked) => {
    const index = showProperties.indexOf(label)
    const newOptions = [ ...showProperties ]

    checked ? newOptions.splice(index, 1) : newOptions.push(label)

    setShowProperties(newOptions)
  }

  return (
    <PropertyToast className={className} show={show} onClose={onHide}>
      <Header>
        <strong className="me-auto">Properties</strong>
      </Header>
      <Toast.Body>
        {properties
          .filter(p => ['Description', 'Name'].indexOf(p.label) < 0).map((property, i) => {
            const checked = showProperties.indexOf(property.label) >= 0
            return (
              <PropertyContainer key={i}>
                <Label key={property.id}>
                  {property.label}
                </Label>
                <Switch
                  checked={checked}
                  onClick={() => handleChange(property.label, checked)}
                />
              </PropertyContainer>
          )}
        )}
      </Toast.Body>
    </PropertyToast>
  )
}

export default ToastTab