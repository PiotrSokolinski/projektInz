import React from 'react'
import LoginPage from 'pages/Login/Loadable'
import DashboardPage from 'pages/Dashboard/Loadable'
import { Switch, Route } from 'react-router-dom'

const App = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route exact path="/" component={DashboardPage} />
  </Switch>
)

export default App
