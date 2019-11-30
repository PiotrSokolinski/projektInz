/*
 * EventInformation Messages
 *
 * This contains all the text for the EventInformation component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.EventInformation'

export default defineMessages({
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  invited: {
    id: `${scope}.invated`,
    defaultMessage: 'Invited members',
  },
  host: {
    id: `${scope}.host`,
    defaultMessage: '- host',
  },
})
