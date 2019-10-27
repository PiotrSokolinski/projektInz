/*
 * CurrentGroupTasks Messages
 *
 * This contains all the text for the CurrentGroupTasks container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.CurrentGroupTasks'

export default defineMessages({
  toDoTitle: {
    id: `${scope}.toDoTitle`,
    defaultMessage: 'To Do',
  },
  inProgressTitle: {
    id: `${scope}.inProgressTitle`,
    defaultMessage: 'In progress',
  },
})
