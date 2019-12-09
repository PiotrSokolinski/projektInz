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
    defaultMessage: 'Chat with {name}',
  },
  textAreaPlaceholder: {
    id: `${scope}.textAreaPlaceholder`,
    defaultMessage: 'Start typing...',
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send',
  },
  you: {
    id: `${scope}.you`,
    defaultMessage: 'You',
  },
  noMoreMessages: {
    id: `${scope}.noMoreMessages`,
    defaultMessage: 'No more messages',
  },
})
