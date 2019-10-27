/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'

import { StyledTitle } from './styled'

const HeaderCell = ({ date, dayFormat }) => <StyledTitle>{date.format(dayFormat)}</StyledTitle>

HeaderCell.propTypes = {
  date: PropTypes.object.isRequired,
  dayFormat: PropTypes.string.isRequired,
}
export default HeaderCell
