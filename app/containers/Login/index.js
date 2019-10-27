/**
 *
 * Login
 *
 */

import React from 'react'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'

import Button from 'components/Button'
import PublicInput from 'components/PublicInput'

import messages from './messages'
import * as Styled from './styled'

const initialValues = { email: '', password: '' }

const validationSchema = intl =>
  Yup.object().shape({
    email: Yup.string()
      .email(intl.formatMessage(messages.emailInvalidError))
      .required(intl.formatMessage(messages.emailEmptyError)),
    password: Yup.string().required(intl.formatMessage(messages.passwordEmptyError)),
  })

const Login = ({ intl, history }) => {
  const submitLoginForm = () => {
    history.push('/')
  }
  return (
    <Styled.Container>
      <Styled.Box>
        <Styled.HeaderContainer>
          <Styled.Avatar size="150" />
          <Styled.Header>
            <FormattedMessage {...messages.header} />
          </Styled.Header>
        </Styled.HeaderContainer>
        <Formik onSubmit={submitLoginForm} initialValues={initialValues} validationSchema={validationSchema(intl)}>
          {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
            <form autoComplete="off">
              <PublicInput
                id="emailField"
                icon={Styled.UserIcon}
                label={intl.formatMessage(messages.emailLabel)}
                error={touched.email && errors.email}
                inputProps={{
                  type: 'email',
                  name: 'email',
                  value: values.email,
                  onBlur: handleBlur,
                  onChange: handleChange,
                }}
              />
              <PublicInput
                id="passwordField"
                icon={Styled.LockIcon}
                label={intl.formatMessage(messages.passwordLabel)}
                error={touched.password && errors.password}
                inputProps={{
                  type: 'password',
                  name: 'password',
                  value: values.password,
                  onBlur: handleBlur,
                  onChange: handleChange,
                }}
              />
              <Styled.FooterContainer>
                <Button type="submit" onClick={handleSubmit}>
                  <FormattedMessage {...messages.buttonTitle} />
                </Button>
                <Styled.LinksContainer>
                  <Styled.Link to="/password-remind">
                    <FormattedMessage {...messages.forgotPasswordMessage} />
                  </Styled.Link>
                  <Styled.Link to="/registration">
                    <FormattedMessage {...messages.noAccount} />
                  </Styled.Link>
                </Styled.LinksContainer>
              </Styled.FooterContainer>
            </form>
          )}
        </Formik>
      </Styled.Box>
    </Styled.Container>
  )
}

Login.propTypes = {
  intl: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default injectIntl(Login)
