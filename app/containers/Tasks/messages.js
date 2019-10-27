/*
 * Tasks Messages
 *
 * This contains all the text for the Tasks container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.Tasks'

export default defineMessages({
  selectPlaceholder: {
    id: `${scope}.selectPlaceholder`,
    defaultMessage: 'Select...',
  },
  selectLabel: {
    id: `${scope}.selectLabel`,
    defaultMessage: 'Group member',
  },
  searchLabel: {
    id: `${scope}.searchLabel`,
    defaultMessage: 'Search',
  },
  searchPlaceholder: {
    id: `${scope}.searchPlaceholder`,
    defaultMessage: 'Search by name',
  },
})
