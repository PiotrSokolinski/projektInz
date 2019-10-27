/**
 *
 * TaskTile
 *
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'

import ConfirmationBox from 'components/ConfirmationBox'
import Modal from 'components/Modal'
import EditTask from 'containers/EditTask'

import messages from './messages'
import * as Styled from './styled'

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

const TaskTile = ({ task, intl }) => {
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false)
  const [isModalTaskVisible, setIsModalTaskVisible] = useState(false)
  const [selectValue, setSelectValue] = useState(selectStatus[0])
  const openDeleteModal = () => setIsModalDeleteVisible(true)
  const closeDeleteModal = () => setIsModalDeleteVisible(false)
  const openTaskModal = () => setIsModalTaskVisible(true)
  const closeTaskModal = () => setIsModalTaskVisible(false)
  const onStatusChange = value => setSelectValue(value)
  return (
    <Styled.Container>
      <Styled.Name onClick={openTaskModal}>{task.taskName}</Styled.Name>
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
      <Styled.TrashIcon size="22" onClick={openDeleteModal} />
      <ConfirmationBox
        visible={isModalDeleteVisible}
        title={intl.formatMessage(messages.title)}
        description={intl.formatMessage(messages.description)}
        onClose={closeDeleteModal}
        name={task.taskName}
      />
      <Modal title="Details" visible={isModalTaskVisible} onClose={closeTaskModal}>
        <EditTask task={task} />
      </Modal>
    </Styled.Container>
  )
}

TaskTile.propTypes = {
  task: PropTypes.object,
  intl: PropTypes.object,
}

export default injectIntl(TaskTile)
