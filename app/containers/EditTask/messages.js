/*
 * EditTask Messages
 *
 * This contains all the text for the EditTask container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.EditTask'

export default defineMessages({
  taskNameEmptyError: {
    id: `${scope}.taskNameEmptyError`,
    defaultMessage: 'Task name is required',
  },
  taskDescriptionEmptyError: {
    id: `${scope}.taskDescriptionEmptyError`,
    defaultMessage: 'Task description is required',
  },
  assigneeEmptyError: {
    id: `${scope}.emailEmptyError`,
    defaultMessage: 'Assignee is required',
  },
  priorityEmptyError: {
    id: `${scope}.passwordEmptyError`,
    defaultMessage: 'Priority is required',
  },
  statusEmptyError: {
    id: `${scope}.statusEmptyError`,
    defaultMessage: 'Status is required',
  },
  taskNameLabel: {
    id: `${scope}.taskNameLabel`,
    defaultMessage: 'Task name',
  },
  taskNamePlaceholder: {
    id: `${scope}.taskNamePlaceholder`,
    defaultMessage: 'Type the task name',
  },
  taskDescriptionLabel: {
    id: `${scope}.taskDescriptionLabel`,
    defaultMessage: 'Description',
  },
  taskDescriptionPlaceholder: {
    id: `${scope}.taskNamePlaceholder`,
    defaultMessage: 'Type the task description',
  },
  taskAssigneeLabel: {
    id: `${scope}.taskAssigneeLabel`,
    defaultMessage: 'Assignee',
  },
  taskPriorityLabel: {
    id: `${scope}.taskPriorityLabel`,
    defaultMessage: 'Priority',
  },
  saveChanges: {
    id: `${scope}.saveChanges`,
    defaultMessage: 'Save changes',
  },
  taskStatusLabel: {
    id: `${scope}.taskStatusLabel`,
    defaultMessage: 'Status',
  },
  authorName: {
    id: `${scope}.authorName`,
    defaultMessage: 'Author: {firstName} {lastName}',
  },
  createdAt: {
    id: `${scope}.createdAt`,
    defaultMessage: 'Created at:',
  },
})
