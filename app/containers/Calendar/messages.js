/*
 * Calendar Messages
 *
 * This contains all the text for the Calendar container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.Calendar'

export default defineMessages({
  monday: {
    id: `${scope}.monday`,
    defaultMessage: 'Monday',
  },
  tuesday: {
    id: `${scope}.tuesday`,
    defaultMessage: 'Tuesday',
  },
  wednesday: {
    id: `${scope}.wednesday`,
    defaultMessage: 'Wednesday',
  },
  thursday: {
    id: `${scope}.thursday`,
    defaultMessage: 'Thursday',
  },
  friday: {
    id: `${scope}.friday`,
    defaultMessage: 'Friday',
  },
  saturday: {
    id: `${scope}.saturday`,
    defaultMessage: 'Saturday',
  },
  sunday: {
    id: `${scope}.sunday`,
    defaultMessage: 'Sunday',
  },
  addEvent: {
    id: `${scope}.addEvent`,
    defaultMessage: 'Add Event',
  },
  changeDate: {
    id: `${scope}.changeDate`,
    defaultMessage: 'Change date',
  },
  chooseMember: {
    id: `${scope}.chooseMember`,
    defaultMessage: 'Choose member',
  },
})
