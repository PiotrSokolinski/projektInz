import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import HeaderCell from './HeaderCell'
import { NUMBER_OF_DAYS } from './constants'
import { StyledWeekCalendarHeaderColumn, StyledWeekCalendarHeaderWrapper } from './styled'

const CalendarHeader = ({ firstDay, columnDimensions }) => {
  if (columnDimensions.length === 0) {
    return null
  }
  const weekdayColumns = []
  let totalWidth = 0
  for (let i = 0; i < NUMBER_OF_DAYS; i += 1) {
    const date = dayjs(firstDay).add(i, 'd')
    const { width } = columnDimensions[i]
    totalWidth += width
    const newCell = (
      <StyledWeekCalendarHeaderColumn key={i} style={{ width }}>
        <HeaderCell date={date} />
      </StyledWeekCalendarHeaderColumn>
    )
    weekdayColumns.push(newCell)
  }
  return (
    <StyledWeekCalendarHeaderWrapper style={{ width: totalWidth }}>{weekdayColumns}</StyledWeekCalendarHeaderWrapper>
  )
}

CalendarHeader.propTypes = {
  firstDay: PropTypes.object.isRequired,
  columnDimensions: PropTypes.array.isRequired,
}

export default CalendarHeader
