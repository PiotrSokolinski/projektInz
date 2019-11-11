/*
 * MemberTile Messages
 *
 * This contains all the text for the MemberTile component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.MemberTile'

export default defineMessages({
  tel: {
    id: `${scope}.tel`,
    defaultMessage: 'Tel. ',
  },
  modalTitle: {
    id: `${scope}.modalTitle`,
    defaultMessage: 'Please confirm',
  },
  modalDescription: {
    id: `${scope}.modalDescription`,
    defaultMessage: 'Are you sure you want to delete ',
  },
})
