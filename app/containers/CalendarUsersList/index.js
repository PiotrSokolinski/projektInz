/**
 *
 * CalendarUsersList
 *
 */

import React, { useState, useEffect } from 'react'
import map from 'lodash/map'
import some from 'lodash/some'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import Checkbox from 'components/Checkbox'
import UserAvatar from 'components/UserAvatar'
import Button from 'components/Button'

import messages from './messages'
import * as Styled from './styled'

const mockUsers = [
  {
    id: 1,
    firstName: 'BobBob',
    avatarUrl: '',
  },
  {
    id: 2,
    firstName: 'Bob',
    avatarUrl: '',
  },
  {
    id: 3,
    firstName: 'BobBob',
    avatarUrl: '',
  },
  {
    id: 4,
    firstName: 'BobBobBob',
    avatarUrl: '',
  },
]

const CalendarUsersList = ({ dispatch, onSave, groupMembers, state }) => (
  <React.Fragment>
    <Styled.CheckboxesContainer>
      {map(groupMembers, (user, index) => (
        <UserCheckbox user={user} dispatch={dispatch} state={state} key={`el-user-${index}`} />
      ))}
    </Styled.CheckboxesContainer>
    <Button type="submit" onClick={onSave}>
      <FormattedMessage {...messages.buttonText} />
    </Button>
  </React.Fragment>
)

const UserCheckbox = ({ user, dispatch, state }) => {
  const [checked, setChecked] = useState(some(state, member => member.id === user.id))
  const toggleCheckbox = () => setChecked(!checked)

  useEffect(() => {
    const type = checked ? 'add' : 'remove'
    dispatch({
      type,
      value: user,
    })
  }, [checked])

  return (
    <Styled.CheckboxContainer>
      <Checkbox checked={checked} onChange={toggleCheckbox} />
      <Styled.Label onClick={toggleCheckbox}>
        <Styled.Name>
          {user.firstName} {user.lastName}
        </Styled.Name>
        <UserAvatar image={user.avatarUrl} size="small" />
      </Styled.Label>
    </Styled.CheckboxContainer>
  )
}

CalendarUsersList.propTypes = {}

export default CalendarUsersList
