/**
 *
 * Navbar
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Icons } from 'themes'
import { makeSelectUser } from 'utils/globalSelectors'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import * as Styled from './styled'

const Navbar = ({ currentUser }) => (
  <Styled.Container>
    {console.log(currentUser)}
    <Styled.LinkElement to="/">
      <Styled.Logo src={Icons.logoHousier} alt="logo" />
    </Styled.LinkElement>
    <Styled.RightElementsContainer>
      <Styled.LinkElement to="/login">
        <Styled.Text>Piotr Sokoliński</Styled.Text>
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

Navbar.propTypes = {
  currentUser: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectUser(),
})

export default /*connect(mapStateToProps)*/ Navbar
