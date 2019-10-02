/**
 *
 * Label
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { StyledLabel } from './styled'

const Label = ({ error, label }) => <StyledLabel error={error}>{label}</StyledLabel>

Label.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
}

Label.defaultProps = {
  error: '',
}

export default Label
