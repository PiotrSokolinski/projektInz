/**
 *
 * Tasks
 *
 */

import React, { useState } from 'react'
import dayjs from 'dayjs'
import map from 'lodash/map'
import matchSorter from 'match-sorter'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'

import Input from 'components/Input'
import CreateTask from 'containers/CreateTask'
import SingleTask from 'containers/SingleTask'

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
    status: 'In Progress',
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
    priority: 'High',
    status: 'In Progress',
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
    priority: 'High',
    status: 'In Progress',
    assignee: {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
    },
  },
]

const selectOptions = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'John',
    label: 'John',
  },
  {
    value: 'John2',
    label: 'John2',
  },
  {
    value: 'John3',
    label: 'John3',
  },
  {
    value: 'John4',
    label: 'John4',
  },
]

const Tasks = ({ intl }) => {
  const [searchTasks, setSearchTasks] = useState('')
  const [selectedMember, setSelectedMember] = useState({
    value: 'all',
    label: 'All',
  })
  const filteredTasks = matchSorter(mockTasks, searchTasks, { keys: ['taskName'] })

  return (
    <Styled.Container>
      <CreateTask />
      <Styled.TasksContainer>
        <Styled.SearchAndSelectContainer>
          <Styled.SearchInputContainer>
            <Input
              inputProps={{
                type: 'text',
                name: 'searchbox',
                placeholder: intl.formatMessage(messages.searchPlaceholder),
                value: searchTasks,
                onChange: e => {
                  setSearchTasks(e.target.value)
                },
              }}
              label={intl.formatMessage(messages.searchLabel)}
            />
          </Styled.SearchInputContainer>
          <Styled.SelectInput
            label={intl.formatMessage(messages.selectLabel)}
            placeholder={intl.formatMessage(messages.selectPlaceholder)}
            selectProps={{
              name: 'accountType',
              value: selectedMember,
              onChange: type => setSelectedMember(type),
              isSearchable: false,
            }}
            options={selectOptions}
          />
        </Styled.SearchAndSelectContainer>
        <Styled.TasksList>
          {map(filteredTasks, (task, index) => (
            <SingleTask task={task} key={`el-task-${index}`} />
          ))}
        </Styled.TasksList>
      </Styled.TasksContainer>
    </Styled.Container>
  )
}

Tasks.propTypes = {
  intl: PropTypes.object,
}

export default injectIntl(Tasks)
