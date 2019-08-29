/**
 *
 * Dashboard
 *
 */

import React from 'react'
// import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

const Dashboard = () => (
  <div>
    <FormattedMessage {...messages.header} />
  </div>
)

Dashboard.propTypes = {}

export default Dashboard
