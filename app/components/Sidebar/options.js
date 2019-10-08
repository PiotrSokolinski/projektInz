import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { HomeIcon, TaskIcon, CalendarIcon, SettingsIcon } from './styled'

export const options = [
  {
    to: '/',
    label: <FormattedMessage {...messages.home} />,
    Icon: HomeIcon,
  },
  {
    to: '/tasks',
    label: <FormattedMessage {...messages.tasks} />,
    Icon: TaskIcon,
  },
  {
    to: '/calendar',
    label: <FormattedMessage {...messages.calendar} />,
    Icon: CalendarIcon,
  },
  {
    to: '/settings',
    label: <FormattedMessage {...messages.settings} />,
    Icon: SettingsIcon,
  },
]
