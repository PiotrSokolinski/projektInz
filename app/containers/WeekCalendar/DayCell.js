/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'

import { StyledDayCell } from './styled'

const DayCell = ({ startSelection }) => {
  const handleMouseDown = event => {
    if (event.button === 0) {
      startSelection()
    }
  }
  return (
    <StyledDayCell onMouseDown={handleMouseDown} role="presentation">
      &nbsp;
    </StyledDayCell>
  )
}

DayCell.propTypes = {
  startSelection: PropTypes.func.isRequired,
}

export default DayCell
