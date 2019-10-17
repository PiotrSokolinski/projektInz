/**
 *
 * Tests for Modal
 *
 */

import React from 'react'
import { render } from '@testing-library/react'

import Modal from '../index'

describe('<Modal />', () => {
  const title = 'mocked tittle'
  const content = 'mocked content text'
  const onClose = jest.fn()

  beforeEach(() => {
    onClose.mockClear()
  })

  it('Should not render modal', () => {
    const { container } = render(<Modal visible={false} title={title} onClose={onClose} />)
    expect(container).toMatchSnapshot()
  })
  it('Should render modal', () => {
    const { container } = render(<Modal visible={false} title={title} onClose={onClose} />)
    expect(container).toMatchSnapshot()
  })
  it('Should become visible', async () => {
    const { container } = render(<Modal visible title={title} onClose={onClose} />)
    expect(container).toMatchSnapshot()
    // time for animation
    await new Promise(res => setTimeout(res, 1000))
    expect(container).toMatchSnapshot()
  })
  it.skip('should invoke onClose method after button press', () => {
    const { container } = render(<Modal visible title={title} onClose={onClose} />)
    container.getElementsByTagName('img')[0].click()
    expect(onClose).toHaveBeenCalled()
  })
  it('should render children correctly', () => {
    const { container } = render(
      <Modal visible title={title} onClose={onClose}>
        {content}
      </Modal>,
    )
    expect(container).toMatchSnapshot()
  })
})
