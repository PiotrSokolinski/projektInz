/*
 * CreateTask Messages
 *
 * This contains all the text for the CreateTask container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.CreateTask'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Create a new task',
  },
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
  taskAssigneePlaceholder: {
    id: `${scope}.taskAssigneePlaceholder`,
    defaultMessage: 'Select assignee...',
  },
  taskPriorityLabel: {
    id: `${scope}.taskPriorityLabel`,
    defaultMessage: 'Priority',
  },
  taskPriorityPlaceholder: {
    id: `${scope}.taskPriorityPlaceholder`,
    defaultMessage: 'Select task priority...',
  },
  createTask: {
    id: `${scope}.createTask`,
    defaultMessage: 'Create a task',
  },
})
