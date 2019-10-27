/**
 *
 * Tests for SingleTask
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import dayjs from 'dayjs'
import { render } from '@testing-library/react'
import { IntlProvider } from 'react-intl'

import SingleTask from '../index'
import { DEFAULT_LOCALE } from '../../../i18n'

describe('<SingleTask />', () => {
  const task = {
    taskName: 'Task Name',
    taskDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    author: {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
    },
    createdAt: dayjs().format('DD/MM/YYYY HH:mm:ss'),
    priority: 'High',
    status: 'Done',
    assignee: {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
    },
  }
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <SingleTask task={task} />
      </IntlProvider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <SingleTask task={task} />
      </IntlProvider>,
    )
    expect(firstChild).toMatchSnapshot()
  })
})
