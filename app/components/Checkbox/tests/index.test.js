/**
 *
 * Tests for Checkbox
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from '@testing-library/react'

import Checkbox from '../index'

describe('<Checkbox />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(<Checkbox />)
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Checkbox />)
    expect(firstChild).toMatchSnapshot()
  })

  it('Should render with label, if it is passed to props', () => {
    const {
      container: { firstChild },
    } = render(<Checkbox label="Test label" />)
    expect(firstChild).toMatchSnapshot()
  })

  it('Should render without input, if it is controlled in parent', () => {
    const {
      container: { firstChild },
    } = render(<Checkbox label="Test label" isControlled />)
    expect(firstChild).toMatchSnapshot()
  })
  it('Should render with img, if it is checked', () => {
    const {
      container: { firstChild },
    } = render(<Checkbox label="Test label" checked />)
    expect(firstChild).toMatchSnapshot()
  })
})
