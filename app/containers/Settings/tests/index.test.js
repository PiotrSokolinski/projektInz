/**
 *
 * Tests for Settings
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import { IntlProvider } from 'react-intl'

import Settings from '../index'
import { DEFAULT_LOCALE } from '../../../i18n'

describe('<Settings />', () => {
  it.skip('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Settings />
      </IntlProvider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Settings />
      </IntlProvider>,
    )
    expect(firstChild).toMatchSnapshot()
  })
})
