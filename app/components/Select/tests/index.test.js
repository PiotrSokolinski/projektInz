/**
 *
 * Tests for Select
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import Select from '../index'

describe('<Select />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(<Select label="Label" />)
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should render without error and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Select label="Label" />)
    expect(firstChild).toMatchSnapshot()
  })

  it('Should render with error and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Select label="Label" error="Error" />)
    expect(firstChild).toMatchSnapshot()
  })
})
