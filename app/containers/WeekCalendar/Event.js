import React from 'react'
import PropTypes from 'prop-types'

import appLocalStorage from 'utils/localStorage'

import { StyledEvent } from './styled'

const Event = ({ start, end, value, color }) => {
  const colorToPaint = color || appLocalStorage.getSession().color
  return (
    <StyledEvent color={colorToPaint}>
      <span>{`${start.format('HH:mm')} - ${end.format('HH:mm')}`}</span>
      <br />
      <br />
      {value}
    </StyledEvent>
  )
}

Event.propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
}
export default Event
