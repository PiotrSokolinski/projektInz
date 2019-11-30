/**
 *
 * Tasks
 *
 */

import React, { useState } from 'react'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import head from 'lodash/head'
import filter from 'lodash/filter'
import matchSorter from 'match-sorter'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { compose, Query } from 'react-apollo'

import appLocalStorage from 'utils/localStorage'
import Input from 'components/Input'
import CreateTask from 'containers/CreateTask'
import SingleTask from 'containers/SingleTask'
import Spinner from 'components/Spinner'
import InformationBox from 'components/InformationBox'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'

import messages from './messages'
import * as Styled from './styled'
import GET_TASKS_QUERY from './getTasks.gql'

// const mockTasks = [
//   {
//     taskName: 'Task Name',
//     taskDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
//     author: {
//       firstName: 'John',
//       lastName: 'Doe',
//       avatarUrl: '',
//     },
//     createdAt: dayjs().format('DD/MM/YYYY HH:mm:ss'),
//     priority: 'High',
//     status: 'Done',
//     assignee: {
//       firstName: 'John',
//       lastName: 'Doe',
//       avatarUrl: '',
//     },
//   },
//   {
//     taskName: 'Task Name',
//     taskDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
//     author: {
//       firstName: 'John',
//       lastName: 'Doe',
//       avatarUrl: '',
//     },
//     createdAt: dayjs().format('DD/MM/YYYY HH:mm:ss'),
//     priority: 'Medium',
//     status: 'To Do',
//     assignee: {
//       firstName: 'John',
//       lastName: 'Doe',
//       avatarUrl: '',
//     },
//   },
//   {
//     taskName: 'Task Name',
//     taskDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
//     author: {
//       firstName: 'John',
//       lastName: 'Doe',
//       avatarUrl: '',
//     },
//     createdAt: dayjs().format('DD/MM/YYYY HH:mm:ss'),
//     priority: 'Low',
//     status: 'Done',
//     assignee: {
//       firstName: 'John',
//       lastName: 'Doe',
//       avatarUrl: '',
//     },
//   },
//   {
//     taskName: 'Task Name',
//     taskDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
//     author: {
//       firstName: 'John',
//       lastName: 'Doe',
//       avatarUrl: '',
//     },
//     createdAt: dayjs().format('DD/MM/YYYY HH:mm:ss'),
//     priority: 'High',
//     status: 'In Progress',
//     assignee: {
//       firstName: 'John',
//       lastName: 'Doe',
//       avatarUrl: '',
//     },
//   },
//   {
//     taskName: 'Task Name',
//     taskDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
//     author: {
//       firstName: 'John',
//       lastName: 'Doe',
//       avatarUrl: '',
//     },
//     createdAt: dayjs().format('DD/MM/YYYY HH:mm:ss'),
//     priority: 'High',
//     status: 'In Progress',
//     assignee: {
//       firstName: 'John',
//       lastName: 'Doe',
//       avatarUrl: '',
//     },
//   },
//   {
//     taskName: 'Task Name',
//     taskDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
//     author: {
//       firstName: 'John',
//       lastName: 'Doe',
//       avatarUrl: '',
//     },
//     createdAt: dayjs().format('DD/MM/YYYY HH:mm:ss'),
//     priority: 'High',
//     status: 'In Progress',
//     assignee: {
//       firstName: 'John',
//       lastName: 'Doe',
//       avatarUrl: '',
//     },
//   },
// ]

const selectOptions = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'To Do',
    label: 'To Do',
  },
  {
    value: 'In Progress',
    label: 'In Progress',
  },
  {
    value: 'Done',
    label: 'Done',
  },
]

const Tasks = ({ intl, data }) => {
  const tasks = get(data, 'getGroupTasks', null)
  const groupMembers = get(data, 'group.members', null)
  const [searchTasks, setSearchTasks] = useState('')
  const [selectedStatus, setSelectedStatus] = useState({
    value: 'all',
    label: 'All',
  })
  const choosenTasks = filter(tasks, task => {
    if (selectedStatus.value === 'all') return true
    return task.status === selectedStatus.value
  })
  const filteredTasks = matchSorter(choosenTasks, searchTasks, { keys: ['name'] })

  return (
    <Styled.Container>
      <CreateTask groupMembers={groupMembers} />
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
              value: selectedStatus,
              onChange: type => setSelectedStatus(type),
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

const withQuery = Component => props => (
  <Query query={GET_TASKS_QUERY} variables={{ id: appLocalStorage.getSession().group.id }}>
    {({ loading, error, data }) => {
      if (loading)
        return (
          <Styled.SpinnerContainer>
            <Spinner size={15} border={1.5} />
          </Styled.SpinnerContainer>
        )
      const errors = formatGraphqlErrors(error)
      if (!isEmpty(errors)) return <InformationBox fullWidth>{head(errors)}</InformationBox>
      return <Component {...props} data={data} />
    }}
  </Query>
)

Tasks.propTypes = {
  intl: PropTypes.object,
}

export default compose(
  withQuery,
  injectIntl,
)(Tasks)
