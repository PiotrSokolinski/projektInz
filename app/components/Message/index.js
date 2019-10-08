/**
 *
 * Message
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import UserAvatar from 'components/UserAvatar'

import * as Styled from './styled'

const Message = ({ text, isOwner, time }) => (
  <Styled.Container isOwner={isOwner}>
    <UserAvatar size="tiny" />
    <Styled.MessageCloud isOwner={isOwner}>{text}</Styled.MessageCloud>
    <Styled.MessageTime>{time}</Styled.MessageTime>
  </Styled.Container>
)

Message.propTypes = {
  text: PropTypes.string,
  isOwner: PropTypes.bool,
  time: PropTypes.string,
}

export default Message
