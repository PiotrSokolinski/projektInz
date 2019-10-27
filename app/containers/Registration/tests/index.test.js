/**
 *
 * Tests for Registration
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import { MemoryRouter } from 'react-router-dom'

import Registration from '../index'
import { DEFAULT_LOCALE } from '../../../i18n'

describe('<Registration />', () => {
  const history = {
    push: jest.fn(),
  }
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <Registration history={history} />
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
          <Registration history={history} />
        </MemoryRouter>
      </IntlProvider>,
    )
    expect(firstChild).toMatchSnapshot()
  })
})
