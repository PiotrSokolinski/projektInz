import React from 'react'
import { render } from '@testing-library/react'
import { IntlProvider } from 'react-intl'

import LogoutPage from '../index'

describe('<LogoutPage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <LogoutPage />
      </IntlProvider>,
    )
    expect(firstChild).toMatchSnapshot()
  })
})
