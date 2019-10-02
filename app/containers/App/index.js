import React from 'react'
import LoginPage from 'pages/Login/Loadable'
import DashboardPage from 'pages/Dashboard/Loadable'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import RegistrationPage from 'pages/Registration/Loadable'
import PublicLayout from 'layouts/PublicLayout'
import { Switch, Route } from 'react-router-dom'

const PUBLIC_ROUTES = [
  {
    path: '/registration',
    Component: RegistrationPage,
    Layout: PublicLayout,
  },
  {
    path: '/login',
    Component: LoginPage,
    Layout: PublicLayout,
  },
]

const App = () => (
  <Switch>
    {PUBLIC_ROUTES.map(({ path, Component, Layout }, index) => (
      <Route
        path={path}
        key={`public-route-elem-${index}`}
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    ))}
    <Route exact path="/" component={DashboardPage} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default App
