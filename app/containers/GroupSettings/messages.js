/*
 * GroupSettings Messages
 *
 * This contains all the text for the GroupSettings container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.GroupSettings'

export default defineMessages({
  role: {
    id: `${scope}.role`,
    defaultMessage: 'User role',
  },
  buttonText: {
    id: `${scope}.buttonText`,
    defaultMessage: `Save {firstname}'s changes`,
  },
  leaveText: {
    id: `${scope}.leaveText`,
    defaultMessage: `Leave group`,
  },
  modalTitle: {
    id: `${scope}.modalTitle`,
    defaultMessage: 'Please confirm',
  },
  modalDescription: {
    id: `${scope}.modalDescription`,
    defaultMessage: 'Are you sure you want to leave the group?',
  },
  nickLabel: {
    id: `${scope}.nickLabel`,
    defaultMessage: 'Nickname',
  },
})
