import React from 'react'
import PropTypes from 'prop-types'
import { Icons } from 'themes'

import * as Styled from './styled'

const LandingLeftSection = () => (
  <Styled.LandingLeftSection>
    <Styled.Image src={Icons.logoHousier} alt="logo" />
  </Styled.LandingLeftSection>
)

const PublicLayout = ({ children }) => (
  <Styled.Columns gapless>
    <Styled.Column logotype="true" size={5}>
      <LandingLeftSection></LandingLeftSection>
    </Styled.Column>
    <Styled.Column>
      <Styled.Container>{children}</Styled.Container>
    </Styled.Column>
  </Styled.Columns>
)

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired,
  // location: PropTypes.object,
}

export default PublicLayout
