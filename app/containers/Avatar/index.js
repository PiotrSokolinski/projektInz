/**
 *
 * Avatar
 *
 */

import React from 'react'
// import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const Avatar = () => (
  <div>
    <FormattedMessage {...messages.header} />
  </div>
)

Avatar.propTypes = {}

export default Avatar
