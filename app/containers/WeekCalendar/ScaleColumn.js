import React from 'react'
import PropTypes from 'prop-types'

import { StyledWeekCalendarScaleCell } from './styled'
import { SCALE_FORMAT, CELL_HEIGHT } from './constants'

const ScaleColumn = ({ scaleIntervals }) => {
  const renderScaleCell = (scaleInterval, index) => (
    <StyledWeekCalendarScaleCell key={index} style={{ height: CELL_HEIGHT, lineHeight: `${CELL_HEIGHT}px` }}>
      <span>{scaleInterval.start.format(SCALE_FORMAT)}</span>
    </StyledWeekCalendarScaleCell>
  )
  return <div>{scaleIntervals.map((scaleInterval, index) => renderScaleCell(scaleInterval, index))}</div>
}

ScaleColumn.propTypes = {
  scaleIntervals: PropTypes.array.isRequired,
}
export default ScaleColumn
