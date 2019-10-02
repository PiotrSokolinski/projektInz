/**
 *
 * PasswordRemind
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { FormattedMessage, injectIntl } from 'react-intl'
import PublicInput from 'components/PublicInput'
import messages from './messages'
import * as Styled from './styled'

const initialValues = { email: '' }

const validationSchema = ({ intl }) =>
  Yup.object().shape({
    email: Yup.string()
      .email(intl.formatMessage(messages.emailInvalidError))
      .required(intl.formatMessage(messages.emailEmptyError)),
  })

const PasswordRemind = ({ intl }) => {
  const sendResetLink = () => {}
  return (
    <Styled.Container>
      <Styled.Box>
        <Styled.Header>
          <FormattedMessage {...messages.header} />
        </Styled.Header>
        <Formik onSubmit={sendResetLink} initialValues={initialValues} validationSchema={validationSchema({ intl })}>
          {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
            <React.Fragment>
              <PublicInput
                id="passwordRemindField"
                label={intl.formatMessage(messages.emailLabel)}
                error={touched.email && errors.email}
                inputProps={{
                  type: 'text',
                  name: 'email',
                  value: values.email,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
              />
              <Styled.ButtonsContainer>
                <Styled.SendButton type="submit" onClick={handleSubmit}>
                  <FormattedMessage {...messages.sendButton} />
                </Styled.SendButton>
                <Styled.Link to="/login">
                  <FormattedMessage {...messages.backToLogin} />
                </Styled.Link>
              </Styled.ButtonsContainer>
            </React.Fragment>
          )}
        </Formik>
      </Styled.Box>
    </Styled.Container>
  )
}

PasswordRemind.propTypes = {
  intl: PropTypes.object.isRequired,
}

export default injectIntl(PasswordRemind)
