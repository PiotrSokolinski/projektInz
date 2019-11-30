/**
 *
 * ConfirmationBox
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import head from 'lodash/head'
import isEmpty from 'lodash/isEmpty'
import { FormattedMessage } from 'react-intl'

import UserAvatar from 'components/UserAvatar'
import InformationBox from '../InformationBox'
import Modal from '../Modal'

import messages from './messages'
import { ButtonContainer, ModalButton, DescriptionContainer, Description } from './styled'

const ConfirmationBox = ({ visible, title, description, onClose, action, avatarUrl, loading, error }) => {
  const onSubmit = async () => {
    await action()
    onClose()
  }
  return (
    <Modal
      visible={visible}
      title={title}
      onClose={onClose}
      description={
        <DescriptionContainer>
          <Description>{description}</Description>
          {avatarUrl || (avatarUrl === '' && <UserAvatar size="middle" image={avatarUrl} />)}
        </DescriptionContainer>
      }
      isConfirmation
    >
      <ButtonContainer>
        <ModalButton inverted onClick={onClose} type="button">
          <FormattedMessage {...messages.cancel} />
        </ModalButton>
        <ModalButton disabled={loading} loading={loading} onClick={onSubmit} type="button">
          <FormattedMessage {...messages.confirmCanceling} />
        </ModalButton>
      </ButtonContainer>
      {!isEmpty(error) && <InformationBox fullWidth>{head(error)}</InformationBox>}
    </Modal>
  )
}

ConfirmationBox.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  action: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.array,
  description: PropTypes.string,
}

ConfirmationBox.defaultProps = {
  onClose: () => {},
  action: () => {},
  loading: false,
  error: [],
  visible: false,
}

export default ConfirmationBox
