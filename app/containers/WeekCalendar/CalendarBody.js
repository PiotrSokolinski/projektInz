import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import DayColumn from './DayColumn'
import { getDayIntervals } from './Utils'
import { NUMBER_OF_DAYS } from './constants'
import { StyledCalendarBody, StyledCalendarBodyRow } from './styled'

const CalendarBody = ({ firstDay, scaleIntervals, onSelectionStart, onCellMouseEnter }) => {
  const weekdayColumns = []
  for (let i = 0; i < NUMBER_OF_DAYS; i += 1) {
    const day = dayjs(firstDay).add(i, 'd')
    const intervals = getDayIntervals(day, scaleIntervals)
    weekdayColumns.push(
      <DayColumn
        key={i}
        colPos={i}
        dayIntervals={intervals}
        onSelectionStart={onSelectionStart}
        onCellMouseEnter={onCellMouseEnter}
      />,
    )
  }
  return (
    <StyledCalendarBody>
      <StyledCalendarBodyRow>{weekdayColumns}</StyledCalendarBodyRow>
    </StyledCalendarBody>
  )
}

CalendarBody.propTypes = {
  firstDay: PropTypes.object.isRequired,
  scaleIntervals: PropTypes.array.isRequired,
  onSelectionStart: PropTypes.func.isRequired,
  onCellMouseEnter: PropTypes.func.isRequired,
}

export default CalendarBody
