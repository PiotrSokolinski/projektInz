/**
 *
 * NewEvent
 *
 */

import React, { useState } from 'react'
import * as Yup from 'yup'
import moment from 'moment'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'

import DatePicker from 'components/DatePicker'

import Input from 'components/Input'
import TextArea from 'components/TextArea'
import Button from 'components/Button'
import Select from 'components/Select'

import messages from './messages'
import * as Styled from './styled'

const options = [
  {
    value: 'Bob',
    label: 'Bob',
  },
  {
    value: 'Bob2',
    label: 'Bob2',
  },
  {
    value: 'Bob3',
    label: 'Bob3',
  },
  {
    value: 'Bob4',
    label: 'Bob4',
  },
  {
    value: 'Bob5',
    label: 'Bob5',
  },
]

const initialValues = (start, end) => {
  return {
    startDate: start,
    startTime: start.startOf('hour'),
    endTime: end.startOf('hour'),
    endDate: end,
    name: '',
    description: '',
    invitations: [],
  }
}

const validationSchema = intl =>
  Yup.object().shape({
    name: Yup.string().required(intl.formatMessage(messages.nameEmptyError)),
    description: Yup.string().required(intl.formatMessage(messages.descriptionEmptyError)),
    startDate: Yup.string().required(intl.formatMessage(messages.startDateError)),
    endDate: Yup.string().required(intl.formatMessage(messages.endDateError)),
    startTime: Yup.string().required(intl.formatMessage(messages.startTimeError)),
    endTime: Yup.string().required(intl.formatMessage(messages.endTimeError)),
  })

const NewEvent = ({ intl, start = moment(), end = moment().add(1, 'hour'), onSave }) => {
  const handleSave = values => {
    onSave({
      value: values.description,
    })
  }
  console.log('asasasasassaassa')
  return (
    <Styled.Container>
      <Formik onSubmit={handleSave} initialValues={initialValues(start, end)} validationSchema={validationSchema(intl)}>
        {({ errors, touched, values, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
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
              hideSelectedOptions={false}
              options={options}
              label={intl.formatMessage(messages.selectLabel)}
              placeholder={intl.formatMessage(messages.selectPlaceholder)}
              selectProps={{
                name: 'invitations',
                value: values.invitations,
                onChange: e => setFieldValue('invitations', options.find(option => option.value === e.value), false),
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
            <Button type="submit" onClick={handleSubmit}>
              <FormattedMessage {...messages.save} />
            </Button>
          </React.Fragment>
        )}
      </Formik>
    </Styled.Container>
  )
}

NewEvent.propTypes = {
  intl: PropTypes.object,
  weekStart: PropTypes.object,
  startTime: PropTypes.object,
  endTime: PropTypes.object,
}

export default injectIntl(NewEvent)
