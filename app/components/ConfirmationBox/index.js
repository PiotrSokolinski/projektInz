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

const ConfirmationBox = ({ title, description, visible, onClose }) => (
  <Modal title={title} visible={visible} onClose={onClose}>
    <Styled.Container>
      <Styled.InfoContainer>
        <Styled.Title>{description}</Styled.Title>
        <UserAvatar size="middle" image="" />
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
}

ConfirmationBox.defaultProps = {
  onClose: () => {},
}

export default ConfirmationBox
