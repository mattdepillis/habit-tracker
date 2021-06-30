import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/about" component={AboutPage}></Route>
      </Switch>
    </div>
  )
}

export default App