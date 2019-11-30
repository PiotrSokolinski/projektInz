/**
 *
 * ChangeCredentials
 *
 */

import React, { useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

import Input from 'components/Input'
import Button from 'components/Button'
import ChangePassword from 'containers/ChangePassword'
import ChangeMail from 'containers/ChangeMail'

import messages from './messages'
import * as Styled from './styled'

const ChangeCredentials = ({ intl, type, onClose }) => {
  const [isResetting, setIsResetting] = useState(false)
  const [password, setPassword] = useState('')
  const confirmPassword = () => {
    if (password.length >= 8) setIsResetting(true)
  }
  return (
    <Styled.Container>
      {!isResetting && (
        <React.Fragment>
          <Input
            id="confirmPasswordField"
            label={intl.formatMessage(messages.confrimPasswordLabel)}
            inputProps={{
              type: 'password',
              name: 'confirmPassword',
              value: password,
              onChange: e => setPassword(e.target.value),
            }}
          />
          <Button type="submit" onClick={confirmPassword}>
            <FormattedMessage {...messages.authorizeUser} />
          </Button>
        </React.Fragment>
      )}
      {isResetting && (
        <React.Fragment>
          {type === 'email' ? (
            <ChangeMail password={password} onClose={onClose} />
          ) : (
            <ChangePassword password={password} onClose={onClose} />
          )}
        </React.Fragment>
      )}
    </Styled.Container>
  )
}

ChangeCredentials.propTypes = {
  intl: PropTypes.object,
  children: PropTypes.node,
}

export default injectIntl(ChangeCredentials)
