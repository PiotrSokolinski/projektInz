/**
 *
 * SingleTask
 *
 */

import React, { useState } from 'react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'

import UserAvatar from 'components/UserAvatar'
import Modal from 'components/Modal'
import EditTask from 'containers/EditTask'

import messages from './messages'
import * as Styled from './styled'

const SingleTask = ({ task }) => {
  const [isShowMore, setIsShowMore] = useState(false)
  const [isModalTaskVisible, setIsModalTaskVisible] = useState(false)
  const openTaskModal = () => setIsModalTaskVisible(true)
  const closeTaskModal = () => setIsModalTaskVisible(false)
  const toggleShowMore = () => setIsShowMore(!isShowMore)

  return (
    <Styled.SingleTaskContainer>
      <Styled.InfoContainer>
        <Styled.TaskName onClick={openTaskModal}>
          <FormattedMessage {...messages.taskName} values={{ name: get(task, 'name', '') }} />
        </Styled.TaskName>
        <Styled.Status>
          <FormattedMessage {...messages.taskStatus} />
          <Styled.Dot status={task.status} />
          {get(task, 'status', '')}
        </Styled.Status>
      </Styled.InfoContainer>
      <Styled.InfoContainer>
        <Styled.PersonContainer>
          <Styled.FullNameContainer>
            <FormattedMessage
              {...messages.authorName}
              values={{ firstName: get(task, 'author.firstName', ''), lastName: get(task, 'author.lastName', '') }}
            />
          </Styled.FullNameContainer>
          <UserAvatar image={task.author.avatarUrl} size="tiny" />
        </Styled.PersonContainer>
        <Styled.PersonContainer>
          <Styled.FullNameContainer>
            <FormattedMessage
              {...messages.assigneeName}
              values={{ firstName: get(task, 'assignee.firstName', ''), lastName: get(task, 'assignee.lastName', '') }}
            />
          </Styled.FullNameContainer>
          <UserAvatar image={task.assignee.avatarUrl} size="tiny" />
        </Styled.PersonContainer>
      </Styled.InfoContainer>
      {isShowMore && (
        <React.Fragment>
          <Styled.DescriptionContainer>
            <FormattedMessage {...messages.description} />
            <Styled.Description>{get(task, 'description', '')}</Styled.Description>
          </Styled.DescriptionContainer>
          <Styled.InfoContainer>
            <Styled.PriorityContainer>
              <FormattedMessage {...messages.taskPriority} />
              <Styled.Arrow priority={task.priority} size="22" />
              <Styled.Priority>{get(task, 'priority', '')}</Styled.Priority>
            </Styled.PriorityContainer>
            <Styled.CreatedAtContainer>
              <FormattedMessage {...messages.createdAt} />
              <Styled.CreatedAt>{dayjs(get(task, 'createdAt', '')).format('DD/MM/YYYY HH:mm:ss')}</Styled.CreatedAt>
            </Styled.CreatedAtContainer>
          </Styled.InfoContainer>
        </React.Fragment>
      )}
      <Styled.ShowMoreContainer>
        <Styled.ShowMoreButton onClick={toggleShowMore}>
          <FormattedMessage {...messages[isShowMore ? 'showLess' : 'showMore']} />
          <Styled.ArrowDown size="22" isShowMore={isShowMore} />
        </Styled.ShowMoreButton>
      </Styled.ShowMoreContainer>
      <Modal title="Details" visible={isModalTaskVisible} onClose={closeTaskModal}>
        <EditTask taskId={task.id} onClose={closeTaskModal} />
      </Modal>
    </Styled.SingleTaskContainer>
  )
}

SingleTask.propTypes = {
  task: PropTypes.object,
}

export default SingleTask
