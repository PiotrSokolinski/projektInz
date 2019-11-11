/**
 *
 * NotFound
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import messages from './messages'
import * as Styled from './styled'

const NotFound = ({ history }) => {
  const goBack = () => history.goBack()
  return (
    <Styled.Container>
      <Styled.Error404>
        <FormattedMessage {...messages.header} />
      </Styled.Error404>
      <Styled.Description>
        <FormattedMessage {...messages.description} />
      </Styled.Description>
      <Styled.Information>
        <FormattedMessage {...messages.information} />
      </Styled.Information>
      <Styled.GoBackButton type="button" onClick={goBack}>
        <FormattedMessage {...messages.goBack} />
      </Styled.GoBackButton>
    </Styled.Container>
  )
}

NotFound.propTypes = {
  history: PropTypes.object,
}

export default NotFound
