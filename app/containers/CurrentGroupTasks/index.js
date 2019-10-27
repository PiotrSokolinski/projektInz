/**
 *
 * CurrentGroupTasks
 *
 */

import React from 'react'
import dayjs from 'dayjs'
import map from 'lodash/map'
// import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import TaskTile from 'components/TaskTile'

import messages from './messages'
import * as Styled from './styled'

const mockTasks = [
  {
    taskName: 'Task Name',
    taskDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    author: {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
    },
    createdAt: dayjs().format('DD/MM/YYYY HH:mm:ss'),
    priority: 'High',
    status: 'Done',
    assignee: {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
    },
  },
  {
    taskName: 'Task Name',
    taskDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    author: {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
    },
    createdAt: dayjs().format('DD/MM/YYYY HH:mm:ss'),
    priority: 'Medium',
    status: 'To Do',
    assignee: {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
    },
  },
  {
    taskName: 'Task Name',
    taskDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    author: {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
    },
    createdAt: dayjs().format('DD/MM/YYYY HH:mm:ss'),
    priority: 'Low',
    status: 'Done',
    assignee: {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
    },
  },
]

const CurrentGroupTasks = () => (
  <Styled.Container>
    <Styled.ToDoColumn>
      <Styled.TitleColumn>
        <FormattedMessage {...messages.toDoTitle} />
      </Styled.TitleColumn>
      {map(mockTasks, (task, index) => (
        <TaskTile task={task} key={`el-to-do-${index}`} />
      ))}
    </Styled.ToDoColumn>
    <Styled.InProgressColumn>
      <Styled.TitleColumn>
        <FormattedMessage {...messages.inProgressTitle} />
      </Styled.TitleColumn>
      {map(mockTasks, (task, index) => (
        <TaskTile task={task} key={`el-in-progress-${index}`} />
      ))}
    </Styled.InProgressColumn>
  </Styled.Container>
)

CurrentGroupTasks.propTypes = {}

export default CurrentGroupTasks
