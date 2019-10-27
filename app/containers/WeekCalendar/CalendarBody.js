/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import times from 'lodash/map'
import moment from 'moment'

import DayColumn from './DayColumn'
import { getDayIntervals } from './Utils'
import { StyledCalendarBody, StyledCalendarBodyRow } from './styled'

class CalendarBody extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.scaleUnit !== this.props.scaleUnit ||
      nextProps.cellHeight !== this.props.cellHeight ||
      nextProps.numberOfDays !== this.props.numberOfDays ||
      !nextProps.firstDay.isSame(this.props.firstDay, 'day')
    )
  }

  render() {
    const { firstDay, numberOfDays, scaleUnit, scaleIntervals, cellHeight, dayCellComponent } = this.props

    const weekdayColumns = []
    for (let i = 0; i < numberOfDays; i += 1) {
      const day = moment(firstDay).add(i, 'd')
      const intervals = getDayIntervals(day, scaleIntervals)
      weekdayColumns.push(
        <DayColumn
          key={i}
          colPos={i}
          cellHeight={cellHeight}
          dayCellComponent={dayCellComponent}
          scaleUnit={scaleUnit}
          dayIntervals={intervals}
          onSelectionStart={this.props.onSelectionStart}
          onCellMouseEnter={this.props.onCellMouseEnter}
        />,
      )
    }

    return (
      <StyledCalendarBody>
        <StyledCalendarBodyRow>{weekdayColumns}</StyledCalendarBodyRow>
      </StyledCalendarBody>
    )
  }
}

CalendarBody.propTypes = {
  firstDay: PropTypes.object.isRequired,
  numberOfDays: PropTypes.number.isRequired,
  scaleUnit: PropTypes.number.isRequired,
  scaleIntervals: PropTypes.array.isRequired,
  cellHeight: PropTypes.number.isRequired,
  dayCellComponent: PropTypes.func.isRequired,
  onSelectionStart: PropTypes.func.isRequired,
  onCellMouseEnter: PropTypes.func.isRequired,
}

export default CalendarBody
