/**
 *
 * Dashboard
 *
 */

import React from 'react'
// import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import * as Styled from './styled'
const Dashboard = () => (
  <Styled.Container>
    <FormattedMessage {...messages.header} />
  </Styled.Container>
)

Dashboard.propTypes = {}

export default Dashboard
