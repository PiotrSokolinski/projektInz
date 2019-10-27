/**
 *
 * CreateTask
 *
 */

import React from 'react'
import * as Yup from 'yup'
import find from 'lodash/find'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'

import Input from 'components/Input'
import TextArea from 'components/TextArea'
import Button from 'components/Button'
import UserAvatar from 'components/UserAvatar'

import messages from './messages'
import * as Styled from './styled'

const selectPriority = [
  {
    value: 'High',
    label: (
      <Styled.LabelContainer>
        <Styled.Arrow priority="High" size="22" /> High
      </Styled.LabelContainer>
    ),
  },
  {
    value: 'Medium',
    label: (
      <Styled.LabelContainer>
        <Styled.Arrow priority="Medium" size="22" /> Medium
      </Styled.LabelContainer>
    ),
  },
  {
    value: 'Low',
    label: (
      <Styled.LabelContainer>
        <Styled.Arrow priority="Low" size="22" /> Low
      </Styled.LabelContainer>
    ),
  },
]

const selectAssignee = [
  {
    value: 'John',
    label: (
      <Styled.LabelContainer>
        <Styled.SelectName>John</Styled.SelectName>
        <UserAvatar image="" size="tiny" />
      </Styled.LabelContainer>
    ),
  },
  {
    value: 'John2',
    label: (
      <Styled.LabelContainer>
        <Styled.SelectName>John</Styled.SelectName>
        <UserAvatar image="" size="tiny" />
      </Styled.LabelContainer>
    ),
  },
  {
    value: 'John3',
    label: (
      <Styled.LabelContainer>
        <Styled.SelectName>John3</Styled.SelectName>
        <UserAvatar image="" size="tiny" />
      </Styled.LabelContainer>
    ),
  },
]

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

const initialValues = ({ taskName, taskDescription, assignee, priority, status }) => {
  const priorityObject = find(selectPriority, option => option.value === priority)
  const statusObject = find(selectStatus, option => option.value === status)
  const assigneeObject = find(selectAssignee, option => option.value === assignee.firstName)
  return {
    taskName,
    taskDescription,
    assignee: assigneeObject,
    priority: priorityObject,
    status: statusObject,
  }
}

const validationSchema = intl =>
  Yup.object().shape({
    taskName: Yup.string().required(intl.formatMessage(messages.taskNameEmptyError)),
    taskDescription: Yup.string().required(intl.formatMessage(messages.taskDescriptionEmptyError)),
    assignee: Yup.string().required(intl.formatMessage(messages.assigneeEmptyError)),
    priority: Yup.string().required(intl.formatMessage(messages.priorityEmptyError)),
    status: Yup.string().required(intl.formatMessage(messages.statusEmptyError)),
  })

const EditTask = ({ intl, task }) => {
  const createNewTask = () => {}
  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Formik onSubmit={createNewTask} initialValues={initialValues(task)} validationSchema={validationSchema(intl)}>
          {({ errors, touched, values, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
            <React.Fragment>
              <Input
                id="taskNameField"
                label={intl.formatMessage(messages.taskNameLabel)}
                error={touched.taskName && errors.taskName}
                inputProps={{
                  type: 'text',
                  name: 'taskName',
                  value: values.taskName,
                  placeholder: intl.formatMessage(messages.taskNamePlaceholder),
                  onChange: handleChange,
                  onBlur: handleBlur,
                  // disabled: currentUser.id === author.id
                }}
              />
              <TextArea
                id="taskDescriptionField"
                label={intl.formatMessage(messages.taskDescriptionLabel)}
                error={touched.taskDescription && errors.taskDescription}
                textAreaProps={{
                  name: 'taskDescription',
                  value: values.taskDescription,
                  placeholder: intl.formatMessage(messages.taskDescriptionPlaceholder),
                  onChange: handleChange,
                  onBlur: handleBlur,
                  // disabled: currentUser.id === author.id
                }}
              />
              <Styled.SelectDropdown
                label={intl.formatMessage(messages.taskAssigneeLabel)}
                error={touched.assignee && errors.assignee}
                id="assigneeSelect"
                options={selectAssignee}
                selectProps={{
                  name: 'assignee',
                  value: values.assignee,
                  onChange: e =>
                    setFieldValue('assignee', selectAssignee.find(option => option.value === e.value), false),
                  onBlur: () => setFieldTouched('assignee', true),
                  isSearchable: false,
                  // disabled: currentUser.id === author.id
                }}
              />
              <Styled.SelectsContainer>
                <Styled.SelectDropdown
                  id="statusSelect"
                  label={intl.formatMessage(messages.taskStatusLabel)}
                  options={selectStatus}
                  selectProps={{
                    name: 'status',
                    value: values.status,
                    onChange: e =>
                      setFieldValue('status', selectStatus.find(option => option.value === e.value), false),
                    isSearchable: false,
                  }}
                />
                <Styled.SelectDropdown
                  label={intl.formatMessage(messages.taskPriorityLabel)}
                  id="prioritySelect"
                  options={selectPriority}
                  selectProps={{
                    name: 'priority',
                    value: values.priority,
                    onChange: e =>
                      setFieldValue('priority', selectPriority.find(option => option.value === e.value), false),
                    isSearchable: false,
                    // disabled: currentUser.id === author.id
                  }}
                />
              </Styled.SelectsContainer>

              <Styled.NonEditableInfo>
                <Styled.InfoContainer>
                  <Styled.FullNameContainer>
                    <FormattedMessage
                      {...messages.authorName}
                      values={{
                        firstName: get(task, 'author.firstName', ''),
                        lastName: get(task, 'author.lastName', ''),
                      }}
                    />
                  </Styled.FullNameContainer>
                  <UserAvatar image={task.author.avatarUrl} size="tiny" />
                </Styled.InfoContainer>
                <Styled.InfoContainer>
                  <FormattedMessage {...messages.createdAt} />
                  <Styled.CreatedAt>{get(task, 'createdAt', '')}</Styled.CreatedAt>
                </Styled.InfoContainer>
              </Styled.NonEditableInfo>
              <Styled.ButtonContainer>
                <Button type="submit" onClick={handleSubmit}>
                  <FormattedMessage {...messages.saveChanges} />
                </Button>
              </Styled.ButtonContainer>
            </React.Fragment>
          )}
        </Formik>
      </Styled.Wrapper>
    </Styled.Container>
  )
}

EditTask.propTypes = {
  intl: PropTypes.object,
  task: PropTypes.object,
}

export default injectIntl(EditTask)
