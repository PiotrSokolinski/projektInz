/**
 *
 * TaskTile
 *
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import head from 'lodash/head'
import remove from 'lodash/remove'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import { injectIntl } from 'react-intl'
import { compose, Mutation } from 'react-apollo'

import ConfirmationBox from 'components/ConfirmationBox'
import Modal from 'components/Modal'
import EditTask from 'containers/EditTask'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'
import InformationBox from 'components/InformationBox'
import Spinner from 'components/Spinner'

import messages from './messages'
import * as Styled from './styled'
import CHANGE_TASK_STATUS from './changeTaskStatus.gql'
import DELETE_TASK from './deleteTask.gql'
// import GET_CURRENT_GROUP_TASKS from '../../containers/CurrentGroupTasks/getCurrentGroupTasks.gql'

const selectStatus = [
  {
    value: 'To Do',
    label: (
      <Styled.LabelContainer>
        <Styled.Dot status="To Do" size="22" /> To Do
      </Styled.LabelContainer>
    ),
  },
  {
    value: 'In Progress',
    label: (
      <Styled.LabelContainer>
        <Styled.Dot status="In Progress" size="22" /> In Progress
      </Styled.LabelContainer>
    ),
  },
  {
    value: 'Done',
    label: (
      <Styled.LabelContainer>
        <Styled.Dot status="Done" size="22" /> Done
      </Styled.LabelContainer>
    ),
  },
]

const findSelectObject = task => filter(selectStatus, selectOption => selectOption.value === task.status)

const TaskTile = ({
  task,
  intl,
  changeTaskStatusAction,
  statusLoading,
  statusErrors,
  deleteTaskAction,
  deleteLoading,
  deleteErrors,
}) => {
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false)
  const [isModalTaskVisible, setIsModalTaskVisible] = useState(false)
  const [selectValue, setSelectValue] = useState(findSelectObject(task))
  const openDeleteModal = () => setIsModalDeleteVisible(true)
  const closeDeleteModal = () => setIsModalDeleteVisible(false)
  const openTaskModal = () => setIsModalTaskVisible(true)
  const closeTaskModal = () => setIsModalTaskVisible(false)
  const onStatusChange = async value => {
    const result = await changeTaskStatusAction({
      variables: {
        id: task.id,
        status: value.value,
      },
    })
    setSelectValue(findSelectObject(result.changeTaskStatus))
  }
  const deleteTask = async () => {
    await deleteTaskAction({
      variables: {
        id: task.id,
      },
    })
  }
  return (
    <React.Fragment>
      <Styled.Container>
        <Styled.Name onClick={openTaskModal}>{task.name}</Styled.Name>
        {statusLoading && <Spinner circle />}
        {!statusLoading && (
          <Styled.StatusSelect
            withoutElements
            id="statusSelect"
            options={selectStatus}
            selectProps={{
              name: 'status',
              value: selectValue,
              onChange: onStatusChange,
              isSearchable: false,
            }}
          />
        )}
        <Styled.TrashIcon size="22" onClick={openDeleteModal} />
        <ConfirmationBox
          visible={isModalDeleteVisible}
          title={intl.formatMessage(messages.title)}
          description={intl.formatMessage(messages.description, { taskName: task.taskName })}
          onClose={closeDeleteModal}
          loading={deleteLoading}
          error={deleteErrors}
          action={deleteTask}
        />
        <Modal title="Details" visible={isModalTaskVisible} onClose={closeTaskModal}>
          <EditTask taskId={task.id} onClose={closeTaskModal} />
        </Modal>
      </Styled.Container>
      {!isEmpty(statusErrors) && <InformationBox fullWidth>{head(statusErrors)}</InformationBox>}
    </React.Fragment>
  )
}

TaskTile.propTypes = {
  task: PropTypes.object,
  intl: PropTypes.object,
  statusLoading: PropTypes.bool,
  statusErrors: PropTypes.array,
  changeTaskStatus: PropTypes.func,
  deleteTaskAction: PropTypes.func,
  deleteLoading: PropTypes.bool,
  deleteErrors: PropTypes.array,
}

const withChangeMutation = Component => props => (
  <Mutation mutation={CHANGE_TASK_STATUS}>
    {(mutate, { loading, error }) => (
      <Component
        {...props}
        changeTaskStatusAction={mutate}
        statusLoading={loading}
        statusErrors={formatGraphqlErrors(error)}
      />
    )}
  </Mutation>
)

const withDeleteMutation = Component => props => (
  <Mutation
    mutation={DELETE_TASK}
    // update={(store, { data: { deleteTask } }) => {
    //   const data = store.readQuery({ query: GET_CURRENT_GROUP_TASKS, variables: { id: 1 } })
    //   remove(data.getGroupTasksToDoInProgress, task => task.id === deleteTask.id)
    //   store.writeQuery({
    //     query: GET_CURRENT_GROUP_TASKS,
    //     data,
    //   })
    // }}
    refetchQueries={['getCurrentGroupTasks']}
  >
    {(mutate, { loading, error }) => (
      <Component
        {...props}
        deleteTaskAction={mutate}
        deleteLoading={loading}
        deleteErrors={formatGraphqlErrors(error)}
      />
    )}
  </Mutation>
)

export default compose(
  injectIntl,
  withChangeMutation,
  withDeleteMutation,
)(TaskTile)
