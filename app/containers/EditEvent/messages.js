/*
 * EditEvent Messages
 *
 * This contains all the text for the EditEvent container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.EditEvent'

export default defineMessages({
  name: {
    id: `${scope}.title`,
    defaultMessage: 'Event Name',
  },
  eventDescription: {
    id: `${scope}.eventDescription`,
    defaultMessage: 'Short event description',
  },
  nameEmptyError: {
    id: `${scope}.nameEmptyError`,
    defaultMessage: 'Event name is required',
  },
  descriptionEmptyError: {
    id: `${scope}.descriptionEmptyError`,
    defaultMessage: 'Event description is required',
  },
  startDateError: {
    id: `${scope}.startDateError`,
    defaultMessage: 'Start date is required',
  },
  endDateError: {
    id: `${scope}.endDateError`,
    defaultMessage: 'End date is required',
  },
  startTimeError: {
    id: `${scope}.startTimeError`,
    defaultMessage: 'Start time is required',
  },
  endTimeError: {
    id: `${scope}.endTimeError`,
    defaultMessage: 'End time is required',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save event',
  },
  selectLabel: {
    id: `${scope}.selectLabel`,
    defaultMessage: 'Send invitations',
  },
  selectPlaceholder: {
    id: `${scope}.selectPlaceholder`,
    defaultMessage: 'Select members',
  },
  author: {
    id: `${scope}.author`,
    defaultMessage: 'Author:',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete:',
  },
})
