/**
 *
 * Tests for Button
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import Button from '../index'

describe('<Button />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(<Button />)
    expect(spy).not.toHaveBeenCalled()
  })

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Button />)
    expect(firstChild).toMatchSnapshot()
  })
  it('Should render with lodaing and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Button loading />)
    expect(firstChild).toMatchSnapshot()
  })
  it('Should render disabled button and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Button disabled />)
    expect(firstChild).toMatchSnapshot()
  })
})
