/**
 *
 * Spinner
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { StyledSpinner } from './styled'

const Spinner = ({ size, border, animation }) => <StyledSpinner size={size} border={border} animation={animation} />

Spinner.propTypes = {
  size: PropTypes.number,
  border: PropTypes.number,
  animation: PropTypes.number,
}

Spinner.defaultProps = {
  size: 3,
  border: 0.5,
  animation: 1.1,
}

export default Spinner
