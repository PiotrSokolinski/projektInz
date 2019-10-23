import React from 'react'
import includes from 'lodash/includes'
import PropTypes from 'prop-types'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import { Route /* Redirect */ } from 'react-router-dom'
import { WholePageContainer } from './styled'

const CREATE_GROUP_PATHNAME = '/create-group'
const UPLOAD_AVATAR_PATHNAME = '/upload-avatar'

const isPublicLayout = location => includes([CREATE_GROUP_PATHNAME, UPLOAD_AVATAR_PATHNAME], location.pathname)

const PrivateRoute = ({ component: Component, store, wrapper: Wrapper, ...props }) => (
  <Route
    {...props}
    render={({ location, ...restProps }) => {
      // if (!validatePageAccess(store, setTheme)) {
      //   return <Redirect to={{ pathname: '/login', state: { from: location } }} />
      // }
      if (isPublicLayout(location))
        return (
          <Wrapper location={location}>
            <Component location={location} {...restProps} />
          </Wrapper>
        )

      return (
        <React.Fragment>
          <Navbar />
          <WholePageContainer>
            <Sidebar />
            <Wrapper location={location}>
              <Component location={location} {...restProps} />
            </Wrapper>
          </WholePageContainer>
        </React.Fragment>
      )
    }}
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.func,
  store: PropTypes.object,
  wrapper: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]),
}

export default PrivateRoute
