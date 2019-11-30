/**
 *
 * GroupSettings
 *
 */

import React, { useState } from 'react'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import head from 'lodash/head'
import filter from 'lodash/filter'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { SketchPicker } from 'react-color'
import { compose, Mutation, Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import appLocalStorage from 'utils/localStorage'
import InformationBox from 'components/InformationBox'
import EditGroup from 'containers/EditGroup'
import UserAvatar from 'components/UserAvatar'
import ConfirmationBox from 'components/ConfirmationBox'
import Input from 'components/Input'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'
import Spinner from 'components/Spinner'

import messages from './messages'
import * as Styled from './styled'
import EDIT_USER_DETAILS_MUTATION from './editUserDetails.gql'
import GET_GROUP_SETTINGS from './getGroupSettings.gql'
import LEAVE_GROUP from './leaveGroup.gql'

// const mockUsers = [
//   {
//     id: 1,
//     firstName: 'BobBob',
//     avatarUrl: '',
//     color: '#e91e63',
//     role: 'Administrator',
//     nick: 'Nick1',
//   },
//   {
//     id: 2,
//     firstName: 'Bob',
//     avatarUrl: '',
//     color: '#9c27b0',
//     role: 'Normal User',
//     nick: 'Nick2',
//   },
//   {
//     id: 3,
//     firstName: 'BobBob',
//     avatarUrl: '',
//     color: '#673ab7',
//     role: 'Normal User',
//     nick: 'Nick3',
//   },
//   {
//     id: 4,
//     firstName: 'BobBobBob',
//     avatarUrl: '',
//     color: '#3f51b5',
//     role: 'Administrator',
//     nick: 'Nick4',
//   },
// ]

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

const GroupSettings = ({
  history,
  intl,
  editUserDetailsAction,
  editUserLoading,
  editUserErrors,
  data,
  leaveGroupAction,
  leaveGroupLoading,
  leaveGroupErrors,
}) => {
  const groupData = get(data, 'group', null)
  const groupMembers = groupData.members
  const [choosenUser, setChoosenUser] = useState(groupMembers[0])
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
  const changeColor = color => {
    setChoosenColor(color.hex)
  }
  const onStatusChange = value => setSelectValue(value)
  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)

  const submitEditUserDetails = async () => {
    const { id } = choosenUser
    await editUserDetailsAction({
      variables: {
        id,
        nick: nickValue,
        role: selectValue[0].value,
        color: choosenColor,
      },
    })
  }

  const leaveGroup = async () => {
    const currentUserId = appLocalStorage.getSession().id
    const result = await leaveGroupAction({
      variables: {
        id: currentUserId,
      },
    })
    const mutationData = get(result, 'data', null)
    if (!isEmpty(mutationData)) {
      history.push('/logout')
    }
  }
  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.UsersContainer>
          <Styled.MembersNamesList>
            {map(groupMembers, (user, index) => {
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
            <Styled.SaveChangesButton
              type="submit"
              onClick={submitEditUserDetails}
              loading={editUserLoading}
              disabled={editUserLoading}
            >
              <FormattedMessage {...messages.buttonText} values={{ firstname: choosenUser.firstName }} />
            </Styled.SaveChangesButton>
          </Styled.ButtonContainer>
          {!isEmpty(editUserErrors) && <InformationBox fullWidth>{head(editUserErrors)}</InformationBox>}
        </Styled.UserSettingsContainer>
      </Styled.Wrapper>
      <Styled.GroupDetailsContainer>
        <EditGroup groupData={groupData} />
      </Styled.GroupDetailsContainer>
      <ConfirmationBox
        title={intl.formatMessage(messages.modalTitle)}
        description={intl.formatMessage(messages.modalDescription)}
        visible={isModalVisible}
        onClose={closeModal}
        loading={leaveGroupLoading}
        error={leaveGroupErrors}
        action={leaveGroup}
      />
    </Styled.Container>
  )
}

GroupSettings.propTypes = {
  intl: PropTypes.object,
  editUserDetailsAction: PropTypes.func,
  editUserErrors: PropTypes.array,
  editUserLoading: PropTypes.bool,
  leaveGroupAction: PropTypes.func,
  leaveGroupLoading: PropTypes.bool,
  leaveGroupErrors: PropTypes.array,
}

GroupSettings.defaultProps = {
  editUserErrors: [],
  editUserLoading: false,
  editUserDetailsAction: () => {},
  leaveGroupErrors: [],
  leaveGroupLoading: false,
  leaveGroupAction: () => {},
}

const withEditUserMutation = Component => props => (
  <Mutation mutation={EDIT_USER_DETAILS_MUTATION}>
    {(mutate, { loading, error }) => (
      <Component
        {...props}
        editUserDetailsAction={mutate}
        editUserLoading={loading}
        editUserErrors={formatGraphqlErrors(error)}
      />
    )}
  </Mutation>
)

const withLeaveGroupMutation = Component => props => (
  <Mutation mutation={LEAVE_GROUP}>
    {(mutate, { loading, error }) => (
      <Component
        {...props}
        leaveGroupAction={mutate}
        leaveGroupLoading={loading}
        leaveGroupErrors={formatGraphqlErrors(error)}
      />
    )}
  </Mutation>
)

const withQuery = Component => props => (
  <Query query={GET_GROUP_SETTINGS} variables={{ id: appLocalStorage.getSession().group.id }}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />
      const errors = formatGraphqlErrors(error)
      if (!isEmpty(errors)) return <InformationBox fullWidth>{head(errors)}</InformationBox>
      return <Component {...props} data={data} />
    }}
  </Query>
)

export default compose(
  withQuery,
  withEditUserMutation,
  withLeaveGroupMutation,
  injectIntl,
  withRouter,
)(GroupSettings)
