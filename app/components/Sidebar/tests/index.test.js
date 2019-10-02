/**
 *
 * Tests for Sidebar
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

import Sidebar from '../index'
import { DEFAULT_LOCALE } from '../../../i18n'

describe('<Sidebar />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </IntlProvider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </IntlProvider>,
    )
    expect(firstChild).toMatchSnapshot()
  })
})
