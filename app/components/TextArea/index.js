/**
 *
 * TextArea
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Help } from 'react-bulma-components/lib/components/form'

import Label from 'components/Label'

import * as Styled from './styled'

const TextArea = ({ error, id, label, textAreaProps }) => (
  <Field id={id}>
    <Label error={error} label={label} />
    <Control>
      <Styled.TextArea {...textAreaProps} />
    </Control>
    {error && <Help color="danger">{error}</Help>}
  </Field>
)

TextArea.propTypes = {
  error: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  textAreaProps: PropTypes.object,
}

export default TextArea
