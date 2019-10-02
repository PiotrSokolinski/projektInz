/**
 *
 * PublicInput
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import * as Styled from './styled'

const PublicInput = ({ icon: Icon, label, error, inputProps }) => {
  const isIcon = !!Icon
  return (
    <Styled.InputBox>
      {isIcon && <Icon size="22" />}
      <Styled.Wrapper isIcon={isIcon}>
        <Styled.Input {...inputProps} isIcon={isIcon} />
        <Styled.Label isValue={inputProps.value} isIcon={isIcon}>
          {label}
        </Styled.Label>
      </Styled.Wrapper>
      {error && <Styled.Error color="danger">{error}</Styled.Error>}
    </Styled.InputBox>
  )
}

PublicInput.propTypes = {
  icon: PropTypes.object,
  label: PropTypes.string,
  error: PropTypes.string,
  inputProps: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
  }),
}

PublicInput.defaultProps = {
  label: '',
  icon: null,
  error: null,
  inputProps: {
    value: '',
    onBlur: () => {},
    onChange: () => {},
  },
}

export default PublicInput
