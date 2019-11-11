/**
 *
 * Button
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { StyledButton } from './styled'
import CircleSpinner from '../CircleSpinner'
const Button = ({ children, onClick, loading, disabled, inverted, stable, ...otherProps }) => (
  <StyledButton onClick={onClick} disabled={disabled} inverted={inverted} stable={stable} {...otherProps}>
    {loading ? <CircleSpinner /> : children}
  </StyledButton>
)

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  otherProps: PropTypes.object,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  inverted: PropTypes.bool,
  stable: PropTypes.bool,
}

Button.defaultProps = {
  children: null,
  onClick: () => {},
  loading: false,
  disabled: false,
  inverted: false,
  stable: false,
}

export default Button
