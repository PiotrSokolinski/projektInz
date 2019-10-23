/**
 *
 * Tests for TextArea
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from '@testing-library/react'

import TextArea from '../index'

describe('<TextArea />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(<TextArea label="Label" />)
    expect(spy).not.toHaveBeenCalled()
  })

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<TextArea label="Label" />)
    expect(firstChild).toMatchSnapshot()
  })
})
