/**
 *
 * TextChat
 *
 */

import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import { FormattedMessage, injectIntl } from 'react-intl'

import Message from 'components/Message'
import UserAvatar from 'components/UserAvatar'
import messages from './messages'
import * as Styled from './styled'

const members = [
  {
    id: 1,
    avatarUrl: '',
  },
  {
    id: 2,
    avatarUrl: '',
  },
  {
    id: 3,
    avatarUrl: '',
  },
  {
    id: 4,
    avatarUrl: '',
  },
]

const TextChat = ({ intl }) => {
  const [newMessage, setNewMessage] = useState('')
  const textArea = useRef(null)
  const setNewMessageText = event => {
    setNewMessage(event.target.value)
  }
  return (
    <Styled.Container>
      <Styled.TextChatHeader>
        <Styled.Header>
          <FormattedMessage {...messages.header} />
        </Styled.Header>
        <Styled.AvatarContainer>
          {map(members, (member, index) => (
            <UserAvatar size="small" key={`el-avatar-${member.id}-${index}`} image={member.avatarUrl} />
          ))}
        </Styled.AvatarContainer>
      </Styled.TextChatHeader>
      <Styled.TextChatBody>
        <Styled.DayInformation>Tusday, 28.10.2019</Styled.DayInformation>
        <Message text="Message" isOwner time="17:10" />
        <Message text="Message" isOwner={false} time="17:10" />
        <Message
          text="MessageMessage MessageMessa geMess ageMessag eMessa geMessag eMessageMessa geMessage MessageMessageM essageMessageMessag eMessageM essageMessa geMessageMessageMessageMessage Message MessageMe ssageMessageMessageMe ssageMessag eMessage"
          isOwner={false}
          time="17:10"
        />
        <Message text="Message" isOwner time="17:10" />
        <Message text="Message" isOwner time="17:10" />
        <Message text="Message" isOwner={false} time="17:10" />
        <Message
          text="MessageMessage MessageMessa geMess ageMessag eMessa geMessag eMessageMessa geMessage MessageMessageM essageMessageMessag eMessageM essageMessa geMessageMessageMessageMessage Message MessageMe ssageMessageMessageMe ssageMessag eMessage"
          isOwner={false}
          time="17:10"
        />
        <Message text="Message" isOwner time="17:10" />
        <Message text="Message" isOwner time="17:10" />
        <Message text="Message" isOwner={false} time="17:10" />
        <Message
          text="MessageMessage MessageMessa geMess ageMessag eMessa geMessag eMessageMessa geMessage MessageMessageM essageMessageMessag eMessageM essageMessa geMessageMessageMessageMessage Message MessageMe ssageMessageMessageMe ssageMessag eMessage"
          isOwner={false}
          time="17:10"
        />
        <Message text="Message" isOwner time="17:10" />
        <Message text="Message" isOwner time="17:10" />
        <Message text="Message" isOwner={false} time="17:10" />
        <Message
          text="MessageMessage MessageMessa geMess ageMessag eMessa geMessag eMessageMessa geMessage MessageMessageM essageMessageMessag eMessageM essageMessa geMessageMessageMessageMessage Message MessageMe ssageMessageMessageMe ssageMessag eMessage"
          isOwner={false}
          time="17:10"
        />
        <Message text="Message" isOwner time="17:10" />
        <Message text="Message" isOwner time="17:10" />
        <Message text="Message" isOwner={false} time="17:10" />
        <Message
          text="MessageMessage MessageMessa geMess ageMessag eMessa geMessag eMessageMessa geMessage MessageMessageM essageMessageMessag eMessageM essageMessa geMessageMessageMessageMessage Message MessageMe ssageMessageMessageMe ssageMessag eMessage"
          isOwner={false}
          time="17:10"
        />
        <Message text="Message" isOwner time="17:10" />
        <Message text="Message" isOwner time="17:10" />
        <Message text="Message" isOwner={false} time="17:10" />
        <Message
          text="MessageMessage MessageMessa geMess ageMessag eMessa geMessag eMessageMessa geMessage MessageMessageM essageMessageMessag eMessageM essageMessa geMessageMessageMessageMessage Message MessageMe ssageMessageMessageMe ssageMessag eMessage"
          isOwner={false}
          time="17:10"
        />
        <Message text="Message" isOwner time="17:10" />
      </Styled.TextChatBody>
      <Styled.TextChatFooter>
        <Styled.TextArea
          inputRef={textArea}
          maxRows={3}
          onInput={setNewMessageText}
          placeholder={intl.formatMessage(messages.textAreaPlaceholder)}
          spellCheck="false"
          value={newMessage}
        />
        <Styled.AttachmentIcon size="25" />
        <Styled.SendButton type="submit" inverted stable>
          <FormattedMessage {...messages.send} />
        </Styled.SendButton>
      </Styled.TextChatFooter>
    </Styled.Container>
  )
}

TextChat.propTypes = {
  intl: PropTypes.object,
}

export default injectIntl(TextChat)
