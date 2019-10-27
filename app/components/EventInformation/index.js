/**
 *
 * EventInformation
 *
 */

import React from 'react'
import dayjs from 'dayjs'
import map from 'lodash/map'
// import PropTypes from 'prop-types';

import UserAvatar from 'components/UserAvatar'

import { FormattedMessage } from 'react-intl'
import messages from './messages'
import * as Styled from './styled'

const mockMembers = [
  {
    firstName: 'John',
    lastName: 'Doe',
    avatarUrl: '',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    avatarUrl: '',
  },
]

const EventInformation = () => (
  <Styled.Container>
    <Styled.DateContainer>
      <Styled.Date>{dayjs().format('DD/MM/YYYY')}</Styled.Date>
      <Styled.Time>
        {dayjs().format('MM:hh')}-{dayjs().format('MM:hh')}
      </Styled.Time>
    </Styled.DateContainer>
    <Styled.Title>
      <FormattedMessage {...messages.description} />
    </Styled.Title>
    <Styled.Description>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
      PageMaker including versions of Lorem Ipsum.
    </Styled.Description>
    <Styled.Title center>
      <FormattedMessage {...messages.invited} />
    </Styled.Title>
    <Styled.InvitedMembersList>
      {map(mockMembers, (member, index) => (
        <Styled.InvitedMemberContainer>
          <Styled.FullName key={`el-member-${index}`}>
            {member.firstName}
            &nbsp;
            {member.lastName}
          </Styled.FullName>
          <UserAvatar image={member.avatarUrl} size="tiny" />
        </Styled.InvitedMemberContainer>
      ))}
    </Styled.InvitedMembersList>
  </Styled.Container>
)

EventInformation.propTypes = {}

export default EventInformation
