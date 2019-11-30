/**
 *
 * Navbar
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { compose, Query } from 'react-apollo'
import { Icons } from 'themes'
import { makeSelectUser } from 'utils/globalSelectors'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import * as Styled from './styled'
import GET_ME_QUERY from './getMe.gql'

const Navbar = ({ data }) => {
  const currentUser = get(data, 'whoAmI', {
    firstName: 'Could not',
    lastName: 'fetch',
  })
  return (
    <Styled.Container>
      <Styled.LinkElement to="/">
        <Styled.Logo src={Icons.logoHousier} alt="logo" />
      </Styled.LinkElement>
      <Styled.RightElementsContainer>
        <Styled.LinkElement to="/login">
          <Styled.Text>
            {currentUser.firstName} {currentUser.lastName}
          </Styled.Text>
          <Styled.Account size="35" />
        </Styled.LinkElement>
        <Styled.LinkElement to="/logout">
          <Styled.Text>
            <FormattedMessage {...messages.logout} />
          </Styled.Text>
          <Styled.Logout size="35" />
        </Styled.LinkElement>
      </Styled.RightElementsContainer>
    </Styled.Container>
  )
}

const withQuery = Component => props => (
  <Query query={GET_ME_QUERY}>{({ loading, error, data }) => <Component {...props} data={data} />}</Query>
)

Navbar.propTypes = {
  // currentUser: PropTypes.object,
}

// const mapStateToProps = createStructuredSelector({
//   currentUser: makeSelectUser(),
// })

export default /* connect(mapStateToProps) */ compose(withQuery)(Navbar)
