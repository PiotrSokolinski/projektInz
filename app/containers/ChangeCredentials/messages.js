/*
 * ChangeCredentials Messages
 *
 * This contains all the text for the ChangeCredentials container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.ChangeCredentials'

export default defineMessages({
  confrimPasswordLabel: {
    id: `${scope}.confrimPasswordLabel`,
    defaultMessage: 'Your password ',
  },
  authorizeUser: {
    id: `${scope}.authorizeUser`,
    defaultMessage: 'Authorize user',
  },
})
