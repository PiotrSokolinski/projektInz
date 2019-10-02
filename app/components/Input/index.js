/**
 *
 * Input
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Help } from 'react-bulma-components/lib/components/form'
import * as Styled from './styled'
import Label from '../Label'

const Input = ({ error, id, label, imageProps, inputProps }) => (
  <Field id={id}>
    <Label error={error} label={label} />
    <Control>
      <Styled.Input {...inputProps} />
      {imageProps && <Styled.Image {...imageProps} />}
    </Control>
    {error && <Help color="danger">{error}</Help>}
  </Field>
)

Input.propTypes = {
  error: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  inputProps: PropTypes.shape({}),
  label: PropTypes.string,
  width: PropTypes.string,
  imageProps: PropTypes.object,
}

Input.defaultProps = {
  inputProps: {
    onChange: () => {},
  },
  error: '',
  label: '',
  imageProps: null,
}

export default Input
