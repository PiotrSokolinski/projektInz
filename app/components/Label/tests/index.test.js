/**
 *
 * Tests for Label
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import Label from '../index'

describe('<Label />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(<Label label="Label" />)
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should render with error and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Label error="error" label="Label" />)
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
    } = render(<Label error={null} label="Label" />)
    expect(firstChild).toMatchSnapshot()
  })
})
