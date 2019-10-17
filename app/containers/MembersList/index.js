/**
 *
 * MembersList
 *
 */

import React from 'react'
import map from 'lodash/map'
// import PropTypes from 'prop-types'
// import { FormattedMessage } from 'react-intl'

import MemberTile from 'components/MemberTile'

// import messages from './messages'
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

const MembersList = () => (
  <Styled.Container>
    {map(mockUsers, (member, index) => (
      <MemberTile member={member} key={`el-member-${index}`} />
    ))}
  </Styled.Container>
)

MembersList.propTypes = {}

export default MembersList
