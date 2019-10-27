/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'

import { StyledCalendarBodyCell, StyledCalendarBodyColumn } from './styled'

const DayColumn = ({
  onCellMouseEnter,
  onSelectionStart,
  cellHeight,
  colPos,
  dayIntervals,
  dayCellComponent: DayCell,
}) => {
  const handleMouseEnter = (col, row) => () => {
    onCellMouseEnter(col, row)
  }

  const handleStartSelection = (col, row) => () => {
    onSelectionStart(col, row)
  }

  const dayCells = dayIntervals.map((interval, rowPos) => (
    <StyledCalendarBodyCell key={rowPos} style={{ height: cellHeight }} onMouseEnter={handleMouseEnter(colPos, rowPos)}>
      <DayCell
        colPos={colPos}
        rowPos={rowPos}
        startTime={interval.start}
        endTime={interval.end}
        cellHeight={cellHeight}
        startSelection={handleStartSelection(colPos, rowPos)}
      />
    </StyledCalendarBodyCell>
  ))

  return <StyledCalendarBodyColumn data-colpos={colPos}>{dayCells}</StyledCalendarBodyColumn>
}

DayColumn.propTypes = {
  colPos: PropTypes.number.isRequired,
  dayIntervals: PropTypes.array.isRequired,
  cellHeight: PropTypes.number.isRequired,
  dayCellComponent: PropTypes.func.isRequired,
  onSelectionStart: PropTypes.func.isRequired,
  onCellMouseEnter: PropTypes.func.isRequired,
}
export default DayColumn
