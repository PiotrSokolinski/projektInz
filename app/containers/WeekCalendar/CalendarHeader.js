/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { StyledWeekCalendarHeaderColumn, StyledWeekCalendarHeaderWrapper } from './styled'

export class CalendarHeader extends React.Component {
  shouldComponentUpdate(nextProps) {
    // for columnDimensions return new object
    return (
      nextProps.numberOfDays !== this.props.numberOfDays ||
      !nextProps.firstDay.isSame(this.props.firstDay, 'day') ||
      nextProps.columnDimensions !== this.props.columnDimensions
    )
  }

  render() {
    const { firstDay, numberOfDays, dayFormat, columnDimensions } = this.props

    const HeaderCell = this.props.headerCellComponent

    if (columnDimensions.length === 0) {
      return null
    }

    const weekdayColumns = []
    let totalWidth = 0

    for (let i = 0; i < numberOfDays; i += 1) {
      const date = moment(firstDay).add(i, 'd')
      const { width } = columnDimensions[i]
      totalWidth += width
      const newCell = (
        <StyledWeekCalendarHeaderColumn key={i} style={{ width }}>
          <HeaderCell date={date} dayFormat={dayFormat} />
        </StyledWeekCalendarHeaderColumn>
      )
      weekdayColumns.push(newCell)
    }

    return (
      <StyledWeekCalendarHeaderWrapper style={{ width: totalWidth }}>{weekdayColumns}</StyledWeekCalendarHeaderWrapper>
    )
  }
}

CalendarHeader.propTypes = {
  firstDay: PropTypes.object.isRequired,
  numberOfDays: PropTypes.number.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
  dayFormat: PropTypes.string.isRequired,
  columnDimensions: PropTypes.array.isRequired,
}

export default CalendarHeader
