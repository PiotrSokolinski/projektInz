/**
 *
 * Tests for Message
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from '@testing-library/react'

import Message from '../index'

describe('<Message />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(<Message />)
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Message />)
    expect(firstChild).toMatchSnapshot()
  })
})
