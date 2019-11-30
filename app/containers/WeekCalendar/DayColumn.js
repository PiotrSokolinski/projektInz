import React from 'react'
import PropTypes from 'prop-types'

import DayCell from './DayCell'
import { CELL_HEIGHT } from './constants'
import { StyledCalendarBodyCell, StyledCalendarBodyColumn } from './styled'

const DayColumn = ({ onCellMouseEnter, onSelectionStart, colPos, dayIntervals }) => {
  const handleMouseEnter = (col, row) => () => {
    onCellMouseEnter(col, row)
  }

  const handleStartSelection = (col, row) => () => {
    onSelectionStart(col, row)
  }

  const dayCells = dayIntervals.map((interval, rowPos) => (
    <StyledCalendarBodyCell
      key={rowPos}
      style={{ height: CELL_HEIGHT }}
      onMouseEnter={handleMouseEnter(colPos, rowPos)}
    >
      <DayCell
        colPos={colPos}
        rowPos={rowPos}
        startTime={interval.start}
        endTime={interval.end}
        startSelection={handleStartSelection(colPos, rowPos)}
      />
    </StyledCalendarBodyCell>
  ))

  return <StyledCalendarBodyColumn data-colpos={colPos}>{dayCells}</StyledCalendarBodyColumn>
}

DayColumn.propTypes = {
  colPos: PropTypes.number.isRequired,
  dayIntervals: PropTypes.array.isRequired,
  onSelectionStart: PropTypes.func.isRequired,
  onCellMouseEnter: PropTypes.func.isRequired,
}
export default DayColumn
