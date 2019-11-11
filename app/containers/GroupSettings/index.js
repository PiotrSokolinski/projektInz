/**
 *
 * GroupSettings
 *
 */

import React, { useState } from 'react'
import map from 'lodash/map'
import filter from 'lodash/filter'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { SketchPicker } from 'react-color'

import EditGroup from 'containers/EditGroup'
import UserAvatar from 'components/UserAvatar'
import ConfirmationBox from 'components/ConfirmationBox'
import Input from 'components/Input'

import messages from './messages'
import * as Styled from './styled'

const mockUsers = [
  {
    id: 1,
    firstName: 'BobBob',
    avatarUrl: '',
    color: '#e91e63',
    role: 'Administrator',
    nick: 'Nick1',
  },
  {
    id: 2,
    firstName: 'Bob',
    avatarUrl: '',
    color: '#9c27b0',
    role: 'Normal User',
    nick: 'Nick2',
  },
  {
    id: 3,
    firstName: 'BobBob',
    avatarUrl: '',
    color: '#673ab7',
    role: 'Normal User',
    nick: 'Nick3',
  },
  {
    id: 4,
    firstName: 'BobBobBob',
    avatarUrl: '',
    color: '#3f51b5',
    role: 'Administrator',
    nick: 'Nick4',
  },
]

const selectRole = [
  {
    value: 'Administrator',
    label: 'Administrator',
  },
  {
    value: 'Normal User',
    label: 'Normal User',
  },
]

const findRoleObject = choosenUser => filter(selectRole, role => choosenUser.role === role.value)

const GroupSettings = ({ history, intl }) => {
  const [choosenUser, setChoosenUser] = useState(mockUsers[0])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [choosenColor, setChoosenColor] = useState(choosenUser.color)
  const [selectValue, setSelectValue] = useState(findRoleObject(choosenUser))
  const [nickValue, setNickValue] = useState(choosenUser.nick)
  const changeUser = user => {
    setChoosenUser(user)
    setChoosenColor(user.color)
    setNickValue(user.nick)
    setSelectValue(findRoleObject(user))
  }
  const changeColor = color => setChoosenColor(color)
  const onStatusChange = value => setSelectValue(value)
  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)
  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.UsersContainer>
          <Styled.MembersNamesList>
            {map(mockUsers, (user, index) => {
              const isHighlight = user.id === choosenUser.id
              return (
                <Styled.UserContainer key={`el-user-${index}`}>
                  <Styled.User onClick={() => changeUser(user)}>
                    <Styled.CircileIcon highlight={isHighlight} size="12" color={user.color} />
                    <Styled.NameContainer highlight={isHighlight}>{user.firstName}</Styled.NameContainer>
                    <UserAvatar withBorder={isHighlight} borderColor={user.color} size="small" image={user.avatarUrl} />
                  </Styled.User>
                </Styled.UserContainer>
              )
            })}
          </Styled.MembersNamesList>
          <Styled.LeaveButton type="button" onClick={openModal}>
            <FormattedMessage {...messages.leaveText} />
          </Styled.LeaveButton>
        </Styled.UsersContainer>
        <Styled.UserSettingsContainer>
          <Styled.ChangableContainer>
            <Styled.DetailsContainer>
              <Styled.Title>
                <FormattedMessage {...messages.role} />
              </Styled.Title>
              <Styled.RoleSelect
                id="roleSelect"
                options={selectRole}
                selectProps={{
                  name: 'role',
                  value: selectValue,
                  onChange: onStatusChange,
                  isSearchable: false,
                }}
              />
              <Styled.Title>
                <FormattedMessage {...messages.nickLabel} />
              </Styled.Title>
              <Input
                id="nickField"
                inputProps={{
                  type: 'text',
                  name: 'nick',
                  value: nickValue,
                  onChange: e => setNickValue(e.target.value),
                }}
              />
            </Styled.DetailsContainer>
            <SketchPicker color={choosenColor} onChangeComplete={changeColor} />
          </Styled.ChangableContainer>
          <Styled.ButtonContainer>
            <Styled.SaveChangesButton type="submit">
              <FormattedMessage {...messages.buttonText} values={{ firstname: choosenUser.firstName }} />
            </Styled.SaveChangesButton>
          </Styled.ButtonContainer>
        </Styled.UserSettingsContainer>
      </Styled.Wrapper>
      <Styled.GroupDetailsContainer>
        <EditGroup />
      </Styled.GroupDetailsContainer>
      <ConfirmationBox
        title={intl.formatMessage(messages.modalTitle)}
        description={intl.formatMessage(messages.modalDescription)}
        visible={isModalVisible}
        onClose={closeModal}
      />
    </Styled.Container>
  )
}

GroupSettings.propTypes = {}

export default injectIntl(GroupSettings)
