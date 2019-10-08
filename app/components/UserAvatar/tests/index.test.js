/**
 *
 * Tests for UserAvatar
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from '@testing-library/react'

import UserAvatar from '../index'

describe('<UserAvatar />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(<UserAvatar />)
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<UserAvatar />)
    expect(firstChild).toMatchSnapshot()
  })
})
