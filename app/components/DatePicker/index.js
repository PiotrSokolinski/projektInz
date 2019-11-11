/**
 *
 * DatePicker
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Help } from 'react-bulma-components/lib/components/form'
import Label from '../Label'
import * as Styled from './styled'

export const MAX_DATE = '01/01/2100'

const DatePicker = ({ label, datePickerProps, error }) => {
  const { value, name, changeValue } = datePickerProps
  return (
    <Styled.Wrapper>
      <Label label={label} error={error} />
      <Styled.DatePicker
        selected={(value && new Date(value)) || null}
        maxDate={new Date(MAX_DATE)}
        minDate={new Date()}
        onChange={val => {
          changeValue(name, val, false)
        }}
        {...datePickerProps}
        error={error}
      />
      {error && <Help color="danger">{error}</Help>}
    </Styled.Wrapper>
  )
}

DatePicker.propTypes = {
  label: PropTypes.string,
  datePickerProps: PropTypes.object,
  error: PropTypes.string,
}
DatePicker.defaultProps = {
  datePickerProps: {
    value: '',
    changeValue: () => {},
    disabled: false,
  },
}

export default DatePicker
