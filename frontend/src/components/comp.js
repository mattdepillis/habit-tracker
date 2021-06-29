import React, { Fragment } from 'react'

const Comp = ({ onClick }) => {
  return (
    <Fragment>
      <button onClick={onClick}>Click me!</button> 
    </Fragment>
  )
}

export default Comp