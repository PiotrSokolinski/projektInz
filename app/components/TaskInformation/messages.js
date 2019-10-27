/*
 * TaskInformation Messages
 *
 * This contains all the text for the TaskInformation component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.TaskInformation'

export default defineMessages({
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  author: {
    id: `${scope}.author`,
    defaultMessage: 'Author: {author}',
  },
  createdAt: {
    id: `${scope}.date`,
    defaultMessage: 'Created at: {createdAt}',
  },
})
