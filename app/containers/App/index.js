import React from 'react'
import AvatarPage from 'pages/Avatar/Loadable'
import CalendarPage from 'pages/Calendar/Loadable'
import CreateGroupPage from 'pages/CreateGroup/Loadable'
import DashboardPage from 'pages/Dashboard/Loadable'
import InvitePersonPage from 'pages/InvitePerson/Loadable'
import LoginPage from 'pages/Login/Loadable'
import NotFoundPage from 'pages/NotFoundPage/Loadable'
import PasswordRemindPage from 'pages/PasswordRemind/Loadable'
import PasswordResetPage from 'pages/PasswordReset/Loadable'
import RegistrationPage from 'pages/Registration/Loadable'
import SettingsPage from 'pages/Settings/Loadable'
import TasksPage from 'pages/Tasks/Loadable'
import UploadAvatarPage from 'pages/UploadAvatar/Loadable'
import PublicLayout from 'layouts/PublicLayout'
import PrivateRoute from 'layouts/PrivateRoute'
import PrivateLayout from 'layouts/PrivateLayout'
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
  {
    path: '/password-remind',
    Component: PasswordRemindPage,
    Layout: PublicLayout,
  },
  {
    path: '/password-reset',
    Component: PasswordResetPage,
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
    <PrivateRoute exact path="/" component={DashboardPage} wrapper={PrivateLayout} />
    <PrivateRoute exact path="/create-group" component={CreateGroupPage} wrapper={PublicLayout} />
    <PrivateRoute exact path="/invite" component={InvitePersonPage} wrapper={PublicLayout} />
    <PrivateRoute exact path="/upload-avatar" component={UploadAvatarPage} wrapper={PublicLayout} />
    <PrivateRoute exact path="/settings" component={SettingsPage} wrapper={PrivateLayout} />
    <PrivateRoute exact path="/tasks" component={TasksPage} wrapper={PrivateLayout} />
    <PrivateRoute exact path="/calendar" component={CalendarPage} wrapper={PrivateLayout} />
    <PrivateRoute exact path="/avatar" component={AvatarPage} wrapper={PublicLayout} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default App
