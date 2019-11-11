/**
 *
 * Tests for InformationBox
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import InformationBox from '..'

describe('<InformationBox />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(<InformationBox />)
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<InformationBox type="other" fullWidth />)
    expect(firstChild).toMatchSnapshot()
  })

  it('Should render error and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<InformationBox type="error" />)
    expect(firstChild).toMatchSnapshot()
  })
})
