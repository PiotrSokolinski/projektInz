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

const EventInformation = ({ eventData }) => {
  const { startDate } = eventData
  const { endDate } = eventData
  return (
    <Styled.Container>
      <Styled.DateContainer>
        <Styled.Date>{dayjs(startDate).format('DD/MM/YYYY')}</Styled.Date>
        <Styled.Time>
          {dayjs(startDate).format('MM:hh')}-{dayjs(endDate).format('MM:hh')}
        </Styled.Time>
      </Styled.DateContainer>
      <Styled.Title>
        <FormattedMessage {...messages.description} />
      </Styled.Title>
      <Styled.Description>{eventData.description}</Styled.Description>
      <Styled.Title center>
        <FormattedMessage {...messages.invited} />
      </Styled.Title>
      <Styled.InvitedMembersList>
        {map(eventData.invitedMembers, (member, index) => {
          const isAuthor = eventData.author.id === member.id
          return (
            <Styled.InvitedMemberContainer>
              <Styled.FullName key={`el-member-${index}`} isAuthor={isAuthor}>
                {member.firstName}
                &nbsp;
                {member.lastName}
              </Styled.FullName>
              <UserAvatar image={member.avatarUrl} size="tiny" />
              {isAuthor && (
                <span>
                  &nbsp;
                  <FormattedMessage {...messages.host} />
                </span>
              )}
            </Styled.InvitedMemberContainer>
          )
        })}
      </Styled.InvitedMembersList>
    </Styled.Container>
  )
}

EventInformation.propTypes = {}

export default EventInformation
