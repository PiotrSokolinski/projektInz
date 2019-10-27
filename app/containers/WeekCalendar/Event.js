/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'

import { StyledEvent } from './styled'

const Event = ({ start, end, value }) => {
  return (
    <StyledEvent>
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
