/*
 * TextChat Messages
 *
 * This contains all the text for the TextChat container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.TextChat'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Chat with your Group',
  },
  textAreaPlaceholder: {
    id: `${scope}.header`,
    defaultMessage: 'Start typing...',
  },
  send: {
    id: `${scope}.header`,
    defaultMessage: 'Send',
  },
})
