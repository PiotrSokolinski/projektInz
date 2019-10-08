/**
 *
 * Settings
 *
 */

import React from 'react'
// import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const Settings = () => (
  <div>
    <FormattedMessage {...messages.header} />
  </div>
)

Settings.propTypes = {}

export default Settings
