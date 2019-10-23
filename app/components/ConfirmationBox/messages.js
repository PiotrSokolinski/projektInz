/*
 * ConfirmationBox Messages
 *
 * This contains all the text for the ConfirmationBox component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.ConfirmationBox'

export default defineMessages({
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes ',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
})
