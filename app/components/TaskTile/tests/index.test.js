/**
 *
 * Tests for TaskTile
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import dayjs from 'dayjs'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import { MockedProvider } from 'react-apollo/test-utils'

import TaskTile, { TaskTileWithIntl } from '../index'
import { DEFAULT_LOCALE } from '../../../i18n'

describe('<TaskTile />', () => {
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
    status: 'To Do',
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
        <MockedProvider>
          <TaskTile task={task} />
        </MockedProvider>
      </IntlProvider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MockedProvider>
          <TaskTile task={task} />
        </MockedProvider>
      </IntlProvider>,
    )
    expect(firstChild).toMatchSnapshot()
  })

  it('Should toogle status of the task', async () => {
    const { container, getByText } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TaskTileWithIntl task={task} />
      </IntlProvider>,
    )
    const select = await waitForElement(() => getByText('To Do'))
    fireEvent.focus(select)
    const control = await waitForElement(() => container.querySelector('.select__control'))
    fireEvent.mouseDown(control)
    const option = getByText('In Progress')
    fireEvent.click(option)
    const chosenInput = container.querySelector('input[name="status"]')
    expect(chosenInput.value).toBe('In Progress')
  })
})
