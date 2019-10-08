/**
 *
 * Calendar
 *
 */

import React from 'react'
// import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const Calendar = () => (
  <div>
    <FormattedMessage {...messages.header} />
  </div>
)

Calendar.propTypes = {}

export default Calendar
