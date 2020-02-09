/**
 *
 * TextChat
 *
 */

import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import map from 'lodash/map'
import parseInt from 'lodash/parseInt'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import groupBy from 'lodash/groupBy'
import orderBy from 'lodash/orderBy'
import keys from 'lodash/keys'
import head from 'lodash/head'
import size from 'lodash/size'
import { FormattedMessage, injectIntl } from 'react-intl'
import { compose, Query, Mutation, Subscription, withApollo } from 'react-apollo'

import appLocalStorage from 'utils/LocalStorage'
import Message from 'components/Message'
import UserAvatar from 'components/UserAvatar'
import InformationBox from 'components/InformationBox'
import Spinner from 'components/Spinner'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'

import * as Styled from './styled'
import CREATE_MESSAGE_MUTATION from './createMessage.gql'
import GET_MESSAGES_QUERY from './getMessages.gql'
import GET_MESSAGE_SUBSCRIPTION from './getMessage.gql'
import messages from './messages'

const MIN_SCROLL_VALUE = 500

const TextChat = ({
  intl,
  groupId,
  members,
  name,
  createMessageAction,
  loading,
  errors,
  data,
  createdNewMessage,
  client,
  fetchMore,
  subscriptionErrors,
}) => {
  const [currentScrollHeight, setCurrentScrollHeight] = useState(0)
  const [fetchingMore, setFetchingMore] = useState(false)
  const [noMoreMessages, setNoMoreMessages] = useState(false)
  const messages = get(data, 'getMessages', null)
  const [newMessage, setNewMessage] = useState('')
  const [prevCreatedNewMessage, setPrevCreatedNewMessage] = useState(null)
  const [prevSizeOfMessages, setPrevSizeOfMessages] = useState(0)
  const textArea = useRef(null)
  const chatArea = useRef(null)

  const mapNewMessage = createdNewMessage => {
    const {
      newMessageCreated: { id, text, sender },
    } = createdNewMessage
    return {
      id,
      text,
      createdAt: dayjs().toISOString(),
      sender,
      __typename: 'Message',
    }
  }
  useEffect(() => {
    if (chatArea.current) scrollTo()
  }, [])
  useEffect(() => {
    if (
      (createdNewMessage && prevCreatedNewMessage === null) ||
      (createdNewMessage &&
        prevCreatedNewMessage !== null &&
        createdNewMessage.newMessageCreated.id !== prevCreatedNewMessage.id)
    ) {
      if (chatArea.current) scrollTo()
      const queryInCache = {
        query: GET_MESSAGES_QUERY,
        variables: { id: `${groupId}`, skip: 0, take: 20 },
      }

      const messagesInCache = client.readQuery(queryInCache)
      messagesInCache.getMessages.push(mapNewMessage(createdNewMessage))

      client.writeQuery({
        ...queryInCache,
        data: {
          ...messagesInCache,
          getMessages: messagesInCache.getMessages,
        },
      })
      setPrevCreatedNewMessage(createdNewMessage.newMessageCreated)
    }

    if (size(messages) - prevSizeOfMessages > 1 && chatArea.current) {
      let scrollValue = chatArea.current.scrollHeight - currentScrollHeight
      if (scrollValue < MIN_SCROLL_VALUE) scrollValue = MIN_SCROLL_VALUE
      scrollTo(scrollValue)
    }
    setPrevSizeOfMessages(size(messages))
  })

  const setNewMessageText = event => {
    setNewMessage(event.target.value)
  }

  const createMessage = async () => {
    await createMessageAction({
      variables: {
        id: appLocalStorage.getSession().group.id,
        text: newMessage,
      },
    })
    setNewMessage('')
  }

  const scrollTo = (value = null) => {
    if (chatArea.current) chatArea.current.scrollTop = value || chatArea.current.scrollHeight
  }

  const handleScroll = () => {
    if (chatArea.current.scrollTop === 0 && size(messages) >= 20) {
      setCurrentScrollHeight(chatArea.current.scrollHeight)
      setFetchingMore(true)
      setNoMoreMessages(false)
      fetchMore({
        variables: {
          id: groupId,
          skip: size(messages),
          take: 10,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          setFetchingMore(false)
          if (isEmpty(fetchMoreResult.getMessages)) {
            setNoMoreMessages(true)
          }

          return Object.assign({}, prev, {
            getMessages: [...prev.getMessages, ...fetchMoreResult.getMessages],
          })
        },
      })
    }
  }

  const renderGroupedMessages = () => {
    const byDaysUnique = allMessages => groupBy(allMessages, message => dayjs(message.createdAt).format('MMMM D, YYYY'))
    const dataGroupedByDays = byDaysUnique(
      orderBy(map(messages, message => ({ ...message, id: parseInt(message.id) })), ['id']),
    )

    return keys(dataGroupedByDays).map((day, i) => (
      <div key={`message-day-${i}`}>
        <Styled.DayInformation>{day}</Styled.DayInformation>
        {dataGroupedByDays[day].map(renderMessage)}
      </div>
    ))
  }

  const renderMessage = (message, index) => {
    const currentUserId = appLocalStorage.getSession().id
    const {
      id,
      text,
      createdAt,
      sender: { id: senderId, avatarUrl, color /*, firstName, lastName */ },
    } = message
    const isOwner = currentUserId === senderId
    return (
      <Message
        key={`message-list-item-${index}-${id}`}
        text={text}
        isOwner={isOwner}
        time={dayjs(createdAt).format('h:mm a')}
        avatar={avatarUrl}
        color={color}
      />
    )
  }

  return (
    <Styled.Container>
      <Styled.TextChatHeader>
        <Styled.Header>Chat with {name}</Styled.Header>
        <Styled.AvatarContainer>
          {map(members, (member, index) => (
            <UserAvatar size="small" key={`el-avatar-${member.id}-${index}`} image={member.avatarUrl} />
          ))}
        </Styled.AvatarContainer>
      </Styled.TextChatHeader>
      <Styled.TextChatBody ref={chatArea} onScroll={handleScroll}>
        {fetchingMore && (
          <Styled.FetchingMoreSpinnerContainer>
            <Spinner size={3} border={0.5} />
          </Styled.FetchingMoreSpinnerContainer>
        )}
        {noMoreMessages && (
          <Styled.NoMoreMessages>
            {/* <FormattedMessage {...messages.noMoreMessages} /> */}
            No more messages
          </Styled.NoMoreMessages>
        )}
        {renderGroupedMessages()}
        {!isEmpty(errors) && <InformationBox fullWidth>{head(errors)}</InformationBox>}
        {!isEmpty(subscriptionErrors) && <InformationBox fullWidth>{head(subscriptionErrors)}</InformationBox>}
      </Styled.TextChatBody>
      <Styled.TextChatFooter>
        <Styled.TextArea
          inputRef={textArea}
          maxRows={3}
          onInput={setNewMessageText}
          // placeholder={intl.formatMessage(messages.textAreaPlaceholder)}
          placeholder="Start typing..."
          spellCheck="false"
          value={newMessage}
        />
        {/* <Styled.AttachmentIcon size="25" /> */}
        <Styled.SendButton
          type="submit"
          inverted
          stable
          loading={loading}
          disabled={loading || !newMessage.trim()}
          onClick={createMessage}
        >
          Send
        </Styled.SendButton>
      </Styled.TextChatFooter>
    </Styled.Container>
  )
}

TextChat.propTypes = {
  intl: PropTypes.object,
  data: PropTypes.object,
  createMessageAction: PropTypes.func,
  loading: PropTypes.bool,
  errors: PropTypes.array,
}

const withQuery = Component => props => {
  const groupId = appLocalStorage.getSession().group.id
  return (
    <Query query={GET_MESSAGES_QUERY} variables={{ id: groupId, skip: 0, take: 20 }}>
      {({ loading, error, data, fetchMore }) => {
        if (loading)
          return (
            <Styled.SpinnerContainer>
              <Spinner />
            </Styled.SpinnerContainer>
          )
        const errors = formatGraphqlErrors(error)
        if (!isEmpty(errors)) return <InformationBox fullWidth>{head(errors)}</InformationBox>
        return <Component {...props} data={data} groupId={groupId} fetchMore={fetchMore} />
      }}
    </Query>
  )
}

const withMutation = Component => props => (
  <Mutation mutation={CREATE_MESSAGE_MUTATION}>
    {(mutate, { loading, error }) => (
      <Component {...props} createMessageAction={mutate} loading={loading} errors={formatGraphqlErrors(error)} />
    )}
  </Mutation>
)

const withSubscription = Component => props => (
  <Subscription subscription={GET_MESSAGE_SUBSCRIPTION}>
    {({ error, data }) => (
      <Component {...props} createdNewMessage={data} subscriptionErrors={formatGraphqlErrors(error)} />
    )}
  </Subscription>
)

export default compose(
  injectIntl,
  withMutation,
  withQuery,
  withSubscription,
  withApollo,
)(TextChat)
