/*
 * SingleTask Messages
 *
 * This contains all the text for the SingleTask container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.SingleTask'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SingleTask container!',
  },
  taskName: {
    id: `${scope}.taskName`,
    defaultMessage: 'Name: {name}',
  },
  taskStatus: {
    id: `${scope}.taskStatus`,
    defaultMessage: 'Status:',
  },
  authorName: {
    id: `${scope}.authorName`,
    defaultMessage: 'Author: {firstName} {lastName}',
  },
  assigneeName: {
    id: `${scope}.authorName`,
    defaultMessage: 'Assignee: {firstName} {lastName}',
  },
  showMore: {
    id: `${scope}.showMore`,
    defaultMessage: 'Show more...',
  },
  showLess: {
    id: `${scope}.showLess`,
    defaultMessage: 'Show less...',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  taskPriority: {
    id: `${scope}.priority`,
    defaultMessage: 'Priority:',
  },
  createdAt: {
    id: `${scope}.createdAt`,
    defaultMessage: 'Created at:',
  },
})
