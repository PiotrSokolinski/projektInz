/**
 *
 * InformationBox
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Container, Icon, Text } from './styled'

import { Icons } from '../../themes'

const InformationBox = ({ children, className, fullWidth, icon, type }) => (
  <Container fullWidth={fullWidth} className={className} type={type}>
    {/* {type !== 'warning' && <Icon src={Icons[icon]} />} */}
    <Text type={type}>{children}</Text>
  </Container>
)

InformationBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  icon: PropTypes.string,
  type: PropTypes.string,
}

InformationBox.defaultProps = {
  children: null,
  className: '',
  fullWidth: false,
  icon: 'exclamationIcon',
  type: 'error',
}

export default InformationBox
