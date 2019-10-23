/**
 *
 * NewEvent
 *
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import DatePicker from 'react-date-picker'

import Input from 'components/Input'
import TextArea from 'components/TextArea'

import messages from './messages'
import * as Styled from './styled'

const NewEvent = ({ intl, weekStart, startTime, endTime }) => {
  const getInitialDate = () => {
    if (startTime && endTime) return new Date(weekStart.add(startTime.indexDay, 'days'))
    return new Date()
  }
  const [date, setNewDate] = useState(getInitialDate())
  const onDateChange = newDate => setNewDate(newDate)

  return (
    <Styled.Container>
      <DatePicker value={date} onChange={onDateChange} calendarAriaLabel="Select a date" />
      <Input label={intl.formatMessage(messages.name)} />
      <TextArea label={intl.formatMessage(messages.eventDescription)} />
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
