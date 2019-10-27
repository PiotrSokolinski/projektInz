/**
 *
 * MemberTile
 *
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'

import UserAvatar from 'components/UserAvatar'
import ConfirmationBox from 'components/ConfirmationBox'

import messages from './messages'
import * as Styled from './styled'

const MemberTile = ({ member: { avatarUrl, firstName, lastName, number }, intl }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)
  return (
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
      <Styled.Delete size="22" onClick={openModal} />
      <ConfirmationBox
        avatarUrl={avatarUrl}
        name={`${firstName} ${lastName}`}
        title={intl.formatMessage(messages.modalTitle)}
        description={intl.formatMessage(messages.modalDescription)}
        visible={isModalVisible}
        onClose={closeModal}
      />
    </Styled.Container>
  )
}

MemberTile.propTypes = {
  member: PropTypes.object,
  intl: PropTypes.object,
}

export default injectIntl(MemberTile)
