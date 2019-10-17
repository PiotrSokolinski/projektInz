/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.Dashboard'

export default defineMessages({
  membersList: {
    id: `${scope}.membersList`,
    defaultMessage: 'Group Members',
  },
  tasks: {
    id: `${scope}.tasks`,
    defaultMessage: 'Current Group Tasks',
  },
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Group Settings',
  },
})
