/**
 *
 * MemberTile
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import UserAvatar from 'components/UserAvatar'

import messages from './messages'
import * as Styled from './styled'

const MemberTile = ({ member: { avatarUrl, firstName, lastName, number } }) => (
  <Styled.Container>
    <Styled.InfoWrapper>
      <UserAvatar size="middle" image={avatarUrl} />
      <Styled.FullName>
        <span>{firstName}</span>
        <span>{lastName}</span>
      </Styled.FullName>
      <Styled.Number>
        <b>
          <FormattedMessage {...messages.tel} />
        </b>
        {number}
      </Styled.Number>
    </Styled.InfoWrapper>
    <Styled.Dots size="22" />
  </Styled.Container>
)

MemberTile.propTypes = {
  member: PropTypes.object,
}

export default MemberTile
