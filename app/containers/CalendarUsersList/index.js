/**
 *
 * CalendarUsersList
 *
 */

import React, { useState, useEffect } from 'react'
import map from 'lodash/map'
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

const CalendarUsersList = ({ dispatch, onSave }) => {
  return (
    <React.Fragment>
      <Styled.CheckboxesContainer>
        {map(mockUsers, (user, index) => (
          <UserCheckbox user={user} dispatch={dispatch} key={`el-user-${index}`} />
        ))}
      </Styled.CheckboxesContainer>
      <Button type="submit" onClick={onSave}>
        <FormattedMessage {...messages.buttonText} />
      </Button>
    </React.Fragment>
  )
}

const UserCheckbox = ({ user, dispatch }) => {
  const [checked, setChecked] = useState(true)
  const toggleCheckbox = () => setChecked(!checked)

  useEffect(() => {
    const type = checked ? 'add' : 'remove'
    dispatch({
      type,
      value: user.id,
    })
  }, [checked])

  return (
    <Styled.CheckboxContainer>
      <Checkbox checked={checked} onChange={toggleCheckbox} />
      <Styled.Label onClick={toggleCheckbox}>
        <Styled.Name>{user.firstName}</Styled.Name>
        <UserAvatar image={user.avatarUrl} size="small" />
      </Styled.Label>
    </Styled.CheckboxContainer>
  )
}

CalendarUsersList.propTypes = {}

export default CalendarUsersList
