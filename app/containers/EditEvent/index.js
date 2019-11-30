/**
 *
 * EditEvent
 *
 */

import React from 'react'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import some from 'lodash/some'
import get from 'lodash/get'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import head from 'lodash/head'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { compose, Query, Mutation } from 'react-apollo'
import { Formik } from 'formik'

import appLocalStorage from 'utils/localStorage'
import DatePicker from 'components/DatePicker'
import Input from 'components/Input'
import TextArea from 'components/TextArea'
import Button from 'components/Button'
import Select from 'components/Select'
import UserAvatar from 'components/UserAvatar'
import Spinner from 'components/Spinner'
import InformationBox from 'components/InformationBox'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'

import messages from './messages'
import * as Styled from './styled'
import GET_EVENT_QUERY from './getEvent.gql'
import EDIT_EVENT_MUTATION from './editEvent.gql'
import DELETE_EVENT_MUTATION from './deleteEvent'

const initialValues = (event, invitationsOptions) => ({
  startDate: dayjs(event.startDate),
  startTime: dayjs(event.startDate).startOf('hour'),
  endTime: dayjs(event.endDate).startOf('hour'),
  endDate: dayjs(event.endDate),
  name: event.name,
  description: event.description,
  invitations: findInvitedMembers(invitationsOptions, event.invitedMembers),
})

const validationSchema = intl =>
  Yup.object().shape({
    name: Yup.string().required(intl.formatMessage(messages.nameEmptyError)),
    description: Yup.string().required(intl.formatMessage(messages.descriptionEmptyError)),
    startDate: Yup.string().required(intl.formatMessage(messages.startDateError)),
    endDate: Yup.string().required(intl.formatMessage(messages.endDateError)),
    startTime: Yup.string().required(intl.formatMessage(messages.startTimeError)),
    endTime: Yup.string().required(intl.formatMessage(messages.endTimeError)),
  })

const Label = ({ user: { firstName, avatarUrl } }) => (
  <Styled.LabelContainer>
    <Styled.SelectName>{firstName}</Styled.SelectName>
    <UserAvatar image={avatarUrl} size="tiny" />
  </Styled.LabelContainer>
)

const findInvitedMembers = (invitationsOptions, invitedMembers) =>
  filter(invitationsOptions, option => some(invitedMembers, member => member.id === option.value))

const EditEvent = ({
  eventId,
  groupMembers,
  data,
  intl,
  editEventAction,
  loading,
  errors,
  onClose,
  deleteEventAction,
  deleteErrors,
  deleteLoading,
}) => {
  const event = get(data, 'getEvent', null)
  const invitationsOptions = map(groupMembers, user => ({ value: user.id, label: <Label user={user} /> }))
  const editEvent = async (values, actions) => {
    const start = dayjs(
      dayjs(values.startDate)
        .format()
        .substring(0, 10) +
        dayjs(values.startTime)
          .format()
          .substring(10),
    ).format()
    const end = dayjs(
      dayjs(values.endDate)
        .format()
        .substring(0, 10) +
        dayjs(values.endTime)
          .format()
          .substring(10),
    ).format()
    const data = {
      id: eventId,
      name: values.name,
      description: values.description,
      startDate: start,
      endDate: end,
      invited: map(values.invitations, invitation => invitation.value),
    }
    const result = await editEventAction({
      variables: {
        data,
      },
    })
    actions.setSubmitting(false)
    const mutationData = get(result, 'data', null)
    if (!isEmpty(mutationData)) {
      onClose()
    }
  }

  const deleteEvent = async () => {
    await deleteEventAction({
      variables: {
        id: eventId,
      },
    })
    onClose()
  }
  const editable =
    appLocalStorage.getSession().id === event.author.id || appLocalStorage.getSession().role === 'Administrator'
  return (
    <Styled.Container>
      <Formik
        onSubmit={editEvent}
        initialValues={initialValues(event, invitationsOptions)}
        validationSchema={validationSchema(intl)}
      >
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
            <Styled.AuhtorContainer>
              <Styled.Author>
                <FormattedMessage {...messages.author} />
                &nbsp; {event.author.firstName} {event.author.lastName} &nbsp;
                <UserAvatar size="small" image={event.author.avatarUrl} />
              </Styled.Author>
              <Styled.DeleteContainer>
                &nbsp;
                <FormattedMessage {...messages.delete} />
                &nbsp;
                {deleteLoading ? (
                  <Spinner size={3} border={0.5} />
                ) : (
                  <Styled.DeleteIcon size="40" onClick={deleteEvent} />
                )}
              </Styled.DeleteContainer>
            </Styled.AuhtorContainer>
            <Styled.DateContainer>
              <DatePicker
                label="Start date"
                error={touched.startDate && errors.startDate}
                datePickerProps={{
                  name: 'startDate',
                  value: values.startDate,
                  dateFormat: 'dd/MM/yyyy',
                  onBlur: () => setFieldTouched('startDate', true),
                  changeValue: setFieldValue,
                  disabled: !editable,
                }}
              />
              <DatePicker
                label="End date"
                error={touched.endDate && errors.endDate}
                datePickerProps={{
                  name: 'endDate',
                  value: values.endDate,
                  dateFormat: 'dd/MM/yyyy',
                  onBlur: () => setFieldTouched('endDate', true),
                  changeValue: setFieldValue,
                  disabled: !editable,
                }}
              />
              <DatePicker
                label="Start time"
                error={touched.startTime && errors.startTime}
                datePickerProps={{
                  name: 'startTime',
                  showTimeSelect: true,
                  showTimeSelectOnly: true,
                  timeIntervals: 60,
                  timeCaption: 'Time',
                  dateFormat: 'hh:mm aa',
                  value: values.startTime,
                  onBlur: () => setFieldTouched('startTime', true),
                  changeValue: setFieldValue,
                  disabled: !editable,
                }}
              />
              <DatePicker
                label="End time"
                error={touched.endTime && errors.endTime}
                datePickerProps={{
                  name: 'endTime',
                  showTimeSelect: true,
                  showTimeSelectOnly: true,
                  timeIntervals: 60,
                  timeCaption: 'Time',
                  dateFormat: 'h:mm aa',
                  value: values.endTime,
                  onBlur: () => setFieldTouched('endTime', true),
                  changeValue: setFieldValue,
                  disabled: !editable,
                }}
              />
            </Styled.DateContainer>
            <Input
              label={intl.formatMessage(messages.name)}
              error={touched.name && errors.name}
              inputProps={{
                type: 'text',
                name: 'name',
                value: values.name,
                onChange: handleChange,
                onBlur: handleBlur,
                disabled: !editable,
              }}
            />
            <Select
              isMulti
              closeMenuOnSelect={false}
              isSearchable={false}
              hideSelectedOptions={false}
              options={invitationsOptions}
              label={intl.formatMessage(messages.selectLabel)}
              placeholder={intl.formatMessage(messages.selectPlaceholder)}
              selectProps={{
                name: 'invitations',
                value: values.invitations,
                onChange: selectedOptions => {
                  setFieldValue('invitations', selectedOptions, false)
                },
                disabled: !editable,
              }}
            />
            <TextArea
              label={intl.formatMessage(messages.eventDescription)}
              error={touched.description && errors.description}
              textAreaProps={{
                type: 'text',
                name: 'description',
                value: values.description,
                onChange: handleChange,
                onBlur: handleBlur,
                disabled: !editable,
              }}
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              loading={loading && isSubmitting}
              disabled={(loading && isSubmitting) || !editable}
            >
              <FormattedMessage {...messages.save} />
            </Button>
          </React.Fragment>
        )}
      </Formik>
      {!isEmpty(errors) && <InformationBox fullWidth>{head(errors)}</InformationBox>}
      {!isEmpty(deleteErrors) && <InformationBox fullWidth>{head(deleteErrors)}</InformationBox>}
    </Styled.Container>
  )
}

const withQuery = Component => props => (
  <Query query={GET_EVENT_QUERY} variables={{ id: get(props, 'eventId', 0) }}>
    {({ loading, error, data }) => {
      if (loading)
        return (
          <Styled.SpinnerContainer>
            <Spinner size={5} border={1} />
          </Styled.SpinnerContainer>
        )
      const errors = formatGraphqlErrors(error)
      if (!isEmpty(errors)) return <InformationBox fullWidth>{head(errors)}</InformationBox>
      return <Component {...props} data={data} />
    }}
  </Query>
)

const withMutation = Component => props => (
  <Mutation mutation={EDIT_EVENT_MUTATION} refetchQueries={['getEvents']}>
    {(mutate, { loading, error }) => (
      <Component {...props} editEventAction={mutate} loading={loading} errors={formatGraphqlErrors(error)} />
    )}
  </Mutation>
)

const withDeleteMutation = Component => props => (
  <Mutation mutation={DELETE_EVENT_MUTATION} refetchQueries={['getEvents']}>
    {(mutate, { loading, error }) => (
      <Component
        {...props}
        deleteEventAction={mutate}
        deleteLoading={loading}
        deleteErrors={formatGraphqlErrors(error)}
      />
    )}
  </Mutation>
)

EditEvent.propTypes = {}

export default compose(
  injectIntl,
  withQuery,
  withMutation,
  withDeleteMutation,
)(EditEvent)
