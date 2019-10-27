/**
 *
 * Tests for WeekCalendar
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import { IntlProvider } from 'react-intl'

import WeekCalendar from '../index'
import { DEFAULT_LOCALE } from '../../../i18n'

describe('<WeekCalendar />', () => {
  it.skip('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    const dispatch = jest.fn()
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <WeekCalendar dispatch={dispatch} />
      </IntlProvider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })

  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <WeekCalendar />
      </IntlProvider>,
    )
    expect(firstChild).toMatchSnapshot()
  })
})
