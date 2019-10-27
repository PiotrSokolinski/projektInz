/**
 *
 * ConfirmationBox
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import Modal from 'components/Modal'
import UserAvatar from 'components/UserAvatar'

import * as Styled from './styled'
import messages from './messages'

const ConfirmationBox = ({ title, description, visible, onClose, name, avatarUrl }) => (
  <Modal title={`${title} ${name}?`} visible={visible} onClose={onClose}>
    <Styled.Container>
      <Styled.InfoContainer>
        <Styled.Title>
          {description}
          {name}.
        </Styled.Title>
        {avatarUrl || (avatarUrl === '' && <UserAvatar size="middle" image={avatarUrl} />)}
      </Styled.InfoContainer>
      <Styled.ButtonsContainer>
        <Styled.ConfirmButton>
          <FormattedMessage {...messages.yes} />
        </Styled.ConfirmButton>
        <Styled.DeclineButton onClick={onClose}>
          <FormattedMessage {...messages.no} />
        </Styled.DeclineButton>
      </Styled.ButtonsContainer>
    </Styled.Container>
  </Modal>
)

ConfirmationBox.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  description: PropTypes.string,
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
}

ConfirmationBox.defaultProps = {
  onClose: () => {},
}

export default ConfirmationBox
