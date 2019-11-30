/**
 *
 * CreateTask
 *
 */

import React from 'react'
import * as Yup from 'yup'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import head from 'lodash/head'
import parseInt from 'lodash/parseInt'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'
import { compose, Mutation } from 'react-apollo'

import Input from 'components/Input'
import TextArea from 'components/TextArea'
import Button from 'components/Button'
import UserAvatar from 'components/UserAvatar'
import InformationBox from 'components/InformationBox'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'

import messages from './messages'
import * as Styled from './styled'
import CREATE_TASK_MUTATION from './createTask.gql'

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

// const selectAssignee = [
//   {
//     value: 'John',
//     label: (
//       <Styled.LabelContainer>
//         <Styled.SelectName>John</Styled.SelectName>
//         <UserAvatar image="" size="tiny" />
//       </Styled.LabelContainer>
//     ),
//   },
//   {
//     value: 'John2',
//     label: (
//       <Styled.LabelContainer>
//         <Styled.SelectName>John</Styled.SelectName>
//         <UserAvatar image="" size="tiny" />
//       </Styled.LabelContainer>
//     ),
//   },
//   {
//     value: 'John3',
//     label: (
//       <Styled.LabelContainer>
//         <Styled.SelectName>John3</Styled.SelectName>
//         <UserAvatar image="" size="tiny" />
//       </Styled.LabelContainer>
//     ),
//   },
// ]

const Label = ({ user: { firstName, avatarUrl } }) => (
  <Styled.LabelContainer>
    <Styled.SelectName>{firstName}</Styled.SelectName>
    <UserAvatar image={avatarUrl} size="tiny" />
  </Styled.LabelContainer>
)

const initialValues = { taskName: '', taskDescription: '', assignee: '', priority: selectPriority[0] }

const validationSchema = intl =>
  Yup.object().shape({
    taskName: Yup.string().required(intl.formatMessage(messages.taskNameEmptyError)),
    taskDescription: Yup.string().required(intl.formatMessage(messages.taskDescriptionEmptyError)),
    assignee: Yup.string().required(intl.formatMessage(messages.assigneeEmptyError)),
    priority: Yup.string().required(intl.formatMessage(messages.priorityEmptyError)),
  })

const CreateTask = ({ intl, createTaskAction, loading, errors, groupMembers }) => {
  const assigneeOptions = map(groupMembers, user => ({ value: user.id, label: <Label user={user} /> }))
  const createNewTask = async (values, actions) => {
    const data = {
      group: 1,
      name: values.taskName,
      description: values.taskDescription,
      assignee: parseInt(values.assignee.value),
      priority: values.priority.value,
    }
    await createTaskAction({
      variables: {
        data,
      },
    })
    actions.setSubmitting(false)
    actions.resetForm(initialValues)
  }
  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.Header>
          <FormattedMessage {...messages.header} />
        </Styled.Header>
        <Formik onSubmit={createNewTask} initialValues={initialValues} validationSchema={validationSchema(intl)}>
          {({
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            isSubmitting,
          }) => (
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
                }}
              />
              <Styled.SelectsContainer>
                <Styled.SelectDropdown
                  label={intl.formatMessage(messages.taskAssigneeLabel)}
                  error={touched.assignee && errors.assignee}
                  id="assigneeSelect"
                  options={assigneeOptions}
                  selectProps={{
                    name: 'assignee',
                    value: values.assignee,
                    placeholder: intl.formatMessage(messages.taskAssigneePlaceholder),
                    onChange: e =>
                      setFieldValue('assignee', assigneeOptions.find(option => option.value === e.value), false),
                    onBlur: () => setFieldTouched('assignee', true),
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
                    placeholder: intl.formatMessage(messages.taskPriorityPlaceholder),
                    onChange: e =>
                      setFieldValue('priority', selectPriority.find(option => option.value === e.value), false),
                    isSearchable: false,
                  }}
                />
              </Styled.SelectsContainer>
              <Styled.ButtonContainer>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  loading={loading && isSubmitting}
                  disabled={loading && isSubmitting}
                >
                  <FormattedMessage {...messages.createTask} />
                </Button>
              </Styled.ButtonContainer>
            </React.Fragment>
          )}
        </Formik>
      </Styled.Wrapper>
      {!isEmpty(errors) && <InformationBox fullWidth>{head(errors)}</InformationBox>}
    </Styled.Container>
  )
}

CreateTask.propTypes = {
  intl: PropTypes.object,
  createTaskAction: PropTypes.func,
  loading: PropTypes.bool,
  errors: PropTypes.array,
}

const withMutation = Component => props => (
  <Mutation mutation={CREATE_TASK_MUTATION} refetchQueries={['getGroupTasks']}>
    {(mutate, { loading, error }) => (
      <Component {...props} createTaskAction={mutate} loading={loading} errors={formatGraphqlErrors(error)} />
    )}
  </Mutation>
)

export default compose(
  injectIntl,
  withMutation,
)(CreateTask)
