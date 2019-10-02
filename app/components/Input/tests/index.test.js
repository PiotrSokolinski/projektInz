/**
 *
 * Tests for Input
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import Input from '../index'
import { DEFAULT_LOCALE } from '../../../i18n'

describe('<Input />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Input label="Label" />
      </IntlProvider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should render with error and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Input error="error" label="Label" />
      </IntlProvider>,
    )
    expect(firstChild).toMatchSnapshot()
  })

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render without error and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Input error={null} label="Label" />
      </IntlProvider>,
    )
    expect(firstChild).toMatchSnapshot()
  })

  it('Should invoke onChange', () => {
    const mockOnChange = jest.fn()
    const { getByPlaceholderText } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Input error={null} inputProps={{ placeholder: 'Placeholder', onChange: mockOnChange }} label="Label" />
      </IntlProvider>,
    )
    const input = getByPlaceholderText('Placeholder')
    expect(input.textContent).toBe('')
    fireEvent.change(input, { target: { value: 'change' } })
    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })
})
