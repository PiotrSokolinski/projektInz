/**
 *
 * Message
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import UserAvatar from 'components/UserAvatar'

import * as Styled from './styled'

const Message = ({ text, isOwner, time, avatar, color }) => (
  <Styled.Container isOwner={isOwner}>
    <UserAvatar size="tiny" image={avatar} />
    <Styled.MessageCloud isOwner={isOwner} color={color}>
      {text}
    </Styled.MessageCloud>
    <Styled.MessageTime>{time}</Styled.MessageTime>
  </Styled.Container>
)

Message.propTypes = {
  text: PropTypes.string,
  isOwner: PropTypes.bool,
  time: PropTypes.string,
}

export default Message
