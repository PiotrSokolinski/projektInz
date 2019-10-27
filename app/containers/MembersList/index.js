/**
 *
 * MembersList
 *
 */

import React, { useState } from 'react'
import map from 'lodash/map'
// import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import MemberTile from 'components/MemberTile'
import Modal from 'components/Modal'
import InvitePerson from 'containers/InvitePerson'

import messages from './messages'
import * as Styled from './styled'

const mockUsers = [
  {
    firstName: 'Bob',
    lastName: 'Doe',
    avatarUrl: '',
    number: '123123123',
  },
  {
    firstName: 'Bob',
    lastName: 'Doe',
    avatarUrl: '',
    number: '123123123',
  },
  {
    firstName: 'Bob',
    lastName: 'Doe',
    avatarUrl: '',
    number: '123123123',
  },
  {
    firstName: 'Bob',
    lastName: 'Doe',
    avatarUrl: '',
    number: '123123123',
  },
]

const MembersList = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const closeModal = () => setModalVisible(false)
  const openModal = () => setModalVisible(true)
  return (
    <Styled.Container>
      {map(mockUsers, (member, index) => (
        <MemberTile member={member} key={`el-member-${index}`} />
      ))}
      <Styled.TextButton onClick={openModal}>
        <FormattedMessage {...messages.invite} />
      </Styled.TextButton>
      <Modal visible={modalVisible} title="Invite a new member" onClose={closeModal} maxWidth={500}>
        <InvitePerson alreadyInSystem onClose={closeModal} />
      </Modal>
    </Styled.Container>
  )
}

MembersList.propTypes = {}

export default MembersList
