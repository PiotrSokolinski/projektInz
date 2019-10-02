import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { HomeIcon, TaskIcon, CalendarIcon } from './styled'

export const options = [
  {
    to: '/',
    label: <FormattedMessage {...messages.home} />,
    Icon: HomeIcon,
  },
  {
    to: '123',
    label: <FormattedMessage {...messages.tasks} />,
    Icon: TaskIcon,
  },
  {
    to: '1234',
    label: <FormattedMessage {...messages.calendar} />,
    Icon: CalendarIcon,
  },
]
