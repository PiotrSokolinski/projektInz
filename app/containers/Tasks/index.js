/**
 *
 * Tasks
 *
 */

import React from 'react'
// import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const Tasks = () => (
  <div>
    <FormattedMessage {...messages.header} />
  </div>
)

Tasks.propTypes = {}

export default Tasks
