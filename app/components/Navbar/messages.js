/*
 * Navbar Messages
 *
 * This contains all the text for the Navbar component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.Navbar'

export default defineMessages({
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Account Settings',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
})
