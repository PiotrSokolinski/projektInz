/**
 *
 * Checkbox
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Label, Container, Checkmark, Input, TickIcon } from './styled'

const Checkbox = ({
  label,
  checked,
  onChange,
  disabled,
  isControlled,
  rounded,
  isBackgroundGray,
  inputProps,
  ...otherProps
}) => (
  <Container
    checked={checked}
    disabled={disabled}
    isBackgroundGray={isBackgroundGray}
    onChange={!disabled ? onChange : null}
    rounded={rounded}
    {...otherProps}
  >
    <Checkmark className="checkmark" disabled={disabled} rounded={rounded}>
      {checked && <TickIcon size="22" />}
    </Checkmark>
    {!isControlled && <Input type="checkbox" {...inputProps} />}
    <Label className="checkbox-label" checked={checked} label={label}>
      {label}
    </Label>
  </Container>
)

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  isBackgroundGray: PropTypes.bool,
  isControlled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  otherProps: PropTypes.object,
  rounded: PropTypes.bool,
  inputProps: PropTypes.object,
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  isBackgroundGray: false,
  isControlled: false,
  label: '',
  onChange: () => {},
  rounded: false,
}

export default Checkbox
