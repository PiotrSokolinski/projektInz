/**
 *
 * CurrentGroupTasks
 *
 */

import React from 'react'
import dayjs from 'dayjs'
import map from 'lodash/map'
import head from 'lodash/head'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import filter from 'lodash/filter'
// import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { compose, Query } from 'react-apollo'

import appLocalStorage from 'utils/localStorage'
import TaskTile from 'components/TaskTile'
import InformationBox from 'components/InformationBox'
import Spinner from 'components/Spinner'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'

import messages from './messages'
import * as Styled from './styled'
import GET_CURRENT_GROUP_TASKS from './getCurrentGroupTasks.gql'

const CurrentGroupTasks = ({ data }) => {
  const tasks = get(data, 'getGroupTasksToDoInProgress', null)
  const toDo = filter(tasks, task => task.status === 'To Do')
  const inProgress = filter(tasks, task => task.status === 'In Progress')
  return (
    <Styled.Container>
      <Styled.ToDoColumn>
        <Styled.TitleColumn>
          <FormattedMessage {...messages.toDoTitle} />
        </Styled.TitleColumn>
        {map(toDo, (task, index) => (
          <TaskTile task={task} key={`el-to-do-${index}`} />
        ))}
      </Styled.ToDoColumn>
      <Styled.InProgressColumn>
        <Styled.TitleColumn>
          <FormattedMessage {...messages.inProgressTitle} />
        </Styled.TitleColumn>
        {map(inProgress, (task, index) => (
          <TaskTile task={task} key={`el-in-progress-${index}`} />
        ))}
      </Styled.InProgressColumn>
    </Styled.Container>
  )
}

const withQuery = Component => props => (
  <Query
    query={GET_CURRENT_GROUP_TASKS}
    variables={{ id: appLocalStorage.getSession().group.id }}
    fetchPolicy="cache-and-network"
  >
    {({ loading, error, data }) => {
      if (loading) return <Spinner circle />
      const errors = formatGraphqlErrors(error)
      if (!isEmpty(errors)) return <InformationBox fullWidth>{head(errors)}</InformationBox>
      return <Component {...props} data={data} />
    }}
  </Query>
)

CurrentGroupTasks.propTypes = {}

export default compose(withQuery)(CurrentGroupTasks)
