/**
 *
 * NewEvent
 *
 */

import React from 'react'
import * as Yup from 'yup'
import head from 'lodash/head'
import map from 'lodash/map'
import filter from 'lodash/filter'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'
import { compose, Mutation } from 'react-apollo'

import appLocalStorage from 'utils/localStorage'
import DatePicker from 'components/DatePicker'
import Input from 'components/Input'
import TextArea from 'components/TextArea'
import Button from 'components/Button'
import Select from 'components/Select'
import UserAvatar from 'components/UserAvatar'
import InformationBox from 'components/InformationBox'
import { getIntervals } from 'containers/WeekCalendar/Utils'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'

import messages from './messages'
import * as Styled from './styled'
import CREATE_EVENT_MUTATION from './createEvent.gql'

// const options = [
//   {
//     value: 'Bob',
//     label: 'Bob',
//   },
//   {
//     value: 'Bob2',
//     label: 'Bob2',
//   },
//   {
//     value: 'Bob3',
//     label: 'Bob3',
//   },
//   {
//     value: 'Bob4',
//     label: 'Bob4',
//   },
//   {
//     value: 'Bob5',
//     label: 'Bob5',
//   },
// ]

const Label = ({ user: { firstName, avatarUrl } }) => (
  <Styled.LabelContainer>
    <Styled.SelectName>{firstName}</Styled.SelectName>
    <UserAvatar image={avatarUrl} size="tiny" />
  </Styled.LabelContainer>
)

const findCurrentUser = invitationsOptions =>
  filter(invitationsOptions, option => option.value === appLocalStorage.getSession().id)

const initialValues = (start, end, invitationsOptions) => ({
  startDate: start,
  startTime: start.startOf('hour'),
  endTime: end.startOf('hour'),
  endDate: end,
  name: '',
  description: '',
  invitations: findCurrentUser(invitationsOptions),
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

const NewEvent = ({
  intl,
  start = dayjs().add(1, 'hour'),
  end = dayjs().add(2, 'hour'),
  onSave,
  onClose,
  onIntervalSelect,
  fromCalendar,
  createEventAction,
  loading,
  errors,
  groupMembers,
}) => {
  const invitationsOptions = map(groupMembers, user => ({ value: user.id, label: <Label user={user} /> }))

  const handleSave = async (values, actions) => {
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
      name: values.name,
      description: values.description,
      startDate: start,
      endDate: end,
      invited: map(values.invitations, invitation => invitation.value),
      group: appLocalStorage.getSession().group.id,
    }
    const result = await createEventAction({
      variables: {
        data,
      },
    })
    actions.setSubmitting(false)
    const mutationData = get(result, 'data', null)
    if (!isEmpty(mutationData)) {
      onSave({
        value: values.name,
      })
    }
  }
  const submitPreselectedInterval = async (values, actions) => {
    const start = dayjs(
      dayjs(values.startDate)
        .format()
        .substring(0, 10) +
        dayjs(values.startTime)
          .format()
          .substring(10),
    )
    const end = dayjs(
      dayjs(values.endDate)
        .format()
        .substring(0, 10) +
        dayjs(values.endTime)
          .format()
          .substring(10),
    )
    const data = {
      name: values.name,
      description: values.description,
      startDate: start.format(),
      endDate: end.format(),
      invited: map(values.invitations, invitation => invitation.value),
      group: appLocalStorage.getSession().group.id,
    }
    const result = await createEventAction({
      variables: {
        data,
      },
    })
    actions.setSubmitting(false)
    const mutationData = get(result, 'data', null)
    if (!isEmpty(mutationData)) {
      const newValue = {
        value: values.name,
      }
      const intervals = getIntervals(start, end)
      const result = intervals.map(interval => ({
        ...interval,
        ...newValue,
      }))
      onIntervalSelect(result)
      onClose()
    }
  }
  const action = fromCalendar ? handleSave : submitPreselectedInterval
  return (
    <Styled.Container>
      <Formik
        onSubmit={action}
        initialValues={initialValues(start, end, invitationsOptions)}
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
              }}
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              loading={loading && isSubmitting}
              disabled={loading && isSubmitting}
            >
              <FormattedMessage {...messages.save} />
            </Button>
          </React.Fragment>
        )}
      </Formik>
      {!isEmpty(errors) && <InformationBox fullWidth>{head(errors)}</InformationBox>}
    </Styled.Container>
  )
}

NewEvent.propTypes = {
  intl: PropTypes.object,
  weekStart: PropTypes.object,
  startTime: PropTypes.object,
  endTime: PropTypes.object,
  fromCalendar: PropTypes.bool,
  createEventAction: PropTypes.func,
  loading: PropTypes.bool,
  errors: PropTypes.array,
}

NewEvent.defaultProps = {
  fromCalendar: false,
  createEventAction: () => {},
  loading: false,
  errors: [],
}

const withMutation = Component => props => (
  <Mutation mutation={CREATE_EVENT_MUTATION}>
    {(mutate, { loading, error }) => (
      <Component {...props} createEventAction={mutate} loading={loading} errors={formatGraphqlErrors(error)} />
    )}
  </Mutation>
)

export default compose(
  injectIntl,
  withMutation,
)(NewEvent)
