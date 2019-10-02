/**
 *
 * Button
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { StyledButton } from './styled'
// import CircleSpinner from '../CircleSpinner'
const Button = ({ children, onClick, loading, disabled, inverted, ...otherProps }) => (
  <StyledButton onClick={onClick} disabled={disabled} inverted={inverted} {...otherProps}>
    {/* {loading ? <CircleSpinner /> : children} */}
    {children}
  </StyledButton>
)

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  otherProps: PropTypes.object,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  inverted: PropTypes.bool,
}

Button.defaultProps = {
  children: null,
  onClick: () => {},
  loading: false,
  disabled: false,
  inverted: false,
}

export default Button
