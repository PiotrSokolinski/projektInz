/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react'
import { FormattedMessage } from 'react-intl'

import NotFoundContainer from 'containers/NotFound'

const NotFound = props => <NotFoundContainer {...props} />

export default NotFound
