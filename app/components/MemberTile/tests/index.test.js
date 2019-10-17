/**
 *
 * Tests for MemberTile
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import { IntlProvider } from 'react-intl'

import MemberTile from '../index'
import { DEFAULT_LOCALE } from '../../../i18n'

describe('<MemberTile />', () => {
  const member = {
    avatarUrl: '',
    firstName: 'Piotr',
    lastName: 'Sokolinski',
    number: '123123123',
  }

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemberTile member={member} />
      </IntlProvider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemberTile member={member} />
      </IntlProvider>,
    )
    expect(firstChild).toMatchSnapshot()
  })
})
