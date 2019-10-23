/*
 * NewEvent Messages
 *
 * This contains all the text for the NewEvent container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.NewEvent'

export default defineMessages({
  name: {
    id: `${scope}.title`,
    defaultMessage: 'Event Name',
  },
  eventDescription: {
    id: `${scope}.eventDescription`,
    defaultMessage: 'Short event description',
  },
})
