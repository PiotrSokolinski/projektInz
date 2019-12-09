/**
 *
 * InformationTile
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { FormattedMessage } from 'react-intl'
import messages from './messages'
import * as Styled from './styled'

const InformationTile = ({ icon: Icon, onOpen, title, isIcon }) => (
  <Styled.Container>
    <Styled.InfoContainer>
      <Icon size="40" />
      <Styled.Title>{title ? <span>{title}</span> : <FormattedMessage {...messages.upToDate} />}</Styled.Title>
    </Styled.InfoContainer>
    {isIcon && <Styled.EyeIcon size="22" onClick={onOpen} />}
  </Styled.Container>
)

InformationTile.propTypes = {
  icon: PropTypes.object,
  onOpen: PropTypes.func,
}

export default InformationTile
