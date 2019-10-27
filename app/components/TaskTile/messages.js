/*
 * TaskTile Messages
 *
 * This contains all the text for the TaskTile component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.TaskTile'

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Are you sure you want to delete ',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'You have to confirm the deletion of ',
  },
  taskStatusLabel: {
    id: `${scope}.taskStatusLabel`,
    defaultMessage: 'Status',
  },
})
