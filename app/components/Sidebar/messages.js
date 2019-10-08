/*
 * Navbar Messages
 *
 * This contains all the text for the Navbar component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.Navbar'

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  tasks: {
    id: `${scope}.tasks`,
    defaultMessage: 'Tasks',
  },
  calendar: {
    id: `${scope}.calendar`,
    defaultMessage: 'Calendar',
  },
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
})
