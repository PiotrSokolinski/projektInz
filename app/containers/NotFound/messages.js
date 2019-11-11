/*
 * NotFound Messages
 *
 * This contains all the text for the NotFound container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.NotFound'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: '404',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: `Looks like you’re lost`,
  },
  information: {
    id: `${scope}.information`,
    defaultMessage: `We can’t find page you’re looking for`,
  },
  goBack: {
    id: `${scope}.goBack`,
    defaultMessage: `Go Back`,
  },
})
