import React, { Fragment, useEffect, useState } from 'react'
// import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import Comp from './components/comp'

const App = () => {

  const [myArray, setResponseArray] = useState([])

  const options = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({
      name: 'Matt',
      body: 'connecting the frontend with the backend'
    })
  }

  
  const sendClickToBackend = async () => {
    fetch(`${process.env.BACKEND_URL}`, options)
      .then(response => response.json())
      .then(response => setResponseArray([...myArray, response.response]))
  }

  return (
    <div>
      <h1>this is my habit tracker!</h1>
      <Comp onClick={sendClickToBackend} />
      <br></br>
      {myArray.length > 0 &&
        myArray.map(item => {
          return <p>{item}</p>
        })
      }
    </div>
  )
}

export default App