/**
 *
 * Tests for InformationTile
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import { Eye } from 'styled-icons/octicons/Eye'

import InformationTile from '../index'
import { DEFAULT_LOCALE } from '../../../i18n'

describe('<InformationTile />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <InformationTile icon={Eye} />
      </IntlProvider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <InformationTile icon={Eye} />
      </IntlProvider>,
    )
    expect(firstChild).toMatchSnapshot()
  })
})
