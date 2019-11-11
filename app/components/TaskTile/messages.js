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
    defaultMessage: 'Please confirm',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'You have to confirm the deletion of {taskName}.',
  },
  taskStatusLabel: {
    id: `${scope}.taskStatusLabel`,
    defaultMessage: 'Status',
  },
})
