/**
 *
 * PasswordReset
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'
import PublicInput from 'components/PublicInput'
import messages from './messages'
import * as Styled from './styled'

const initialValues = { password: '', repeatedPassword: '' }

const validationSchema = ({ intl }) =>
  Yup.object().shape({
    password: Yup.string().required(intl.formatMessage(messages.passwordEmptyError)),
    repeatedPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], intl.formatMessage(messages.passwordsDoNotMatchError))
      .required(intl.formatMessage(messages.passwordConfirmEmpty)),
  })

const PasswordReset = ({ intl }) => (
  <Styled.Container>
    <Styled.Box>
      <Styled.Header>
        <FormattedMessage {...messages.header} />
      </Styled.Header>
      <Formik onSubmit={() => {}} initialValues={initialValues} validationSchema={validationSchema({ intl })}>
        {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
          <React.Fragment>
            <PublicInput
              id="passwordField"
              label={intl.formatMessage(messages.passwordLabel)}
              error={touched.password && errors.password}
              inputProps={{
                type: 'password',
                name: 'password',
                value: values.password,
                onChange: handleChange,
                onBlur: handleBlur,
              }}
            />
            <PublicInput
              id="repeatedPasswordField"
              label={intl.formatMessage(messages.repeatedPasswordLabel)}
              error={touched.repeatedPassword && errors.repeatedPassword}
              inputProps={{
                type: 'password',
                name: 'repeatedPassword',
                value: values.repeatedPassword,
                onChange: handleChange,
                onBlur: handleBlur,
              }}
            />
            <Styled.ButtonsContainer>
              <Styled.ResetButton type="submit" onClick={handleSubmit}>
                <FormattedMessage {...messages.resetButton} />
              </Styled.ResetButton>
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

PasswordReset.propTypes = {
  intl: PropTypes.object,
}

export default injectIntl(PasswordReset)
