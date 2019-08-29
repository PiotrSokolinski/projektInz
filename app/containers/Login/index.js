/**
 *
 * Login
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Icons } from 'themes'
import messages from './messages'
import * as Styled from './styled'

const initialValues = { email: '', password: '' }

const validationSchema = ({ intl }) =>
  Yup.object().shape({
    email: Yup.string()
      .email(intl.formatMessage(messages.emailInvalidError))
      .required(intl.formatMessage(messages.emailEmptyError)),
    password: Yup.string().required(intl.formatMessage(messages.passwordEmptyError)),
  })

const Login = ({ intl }) => {
  const submitLoginForm = () => {}
  return (
    <Styled.Box>
      <Styled.Avatar src={Icons.loginIcon} alt="loginIcon" />
      <Styled.Header>
        <FormattedMessage {...messages.header} />
      </Styled.Header>
      <Formik onSubmit={submitLoginForm} initialValues={initialValues} validationSchema={validationSchema({ intl })}>
        {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
          <form autoComplete="off">
            <LoginInput
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
            <LoginInput
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
            <Styled.Button type="submit" onClick={handleSubmit}>
              <FormattedMessage {...messages.buttonTitle} />
            </Styled.Button>
            <Styled.Link to="/password-remind">
              <FormattedMessage {...messages.forgotPasswordMessage} />
            </Styled.Link>
            <Styled.Link to="/register">
              <FormattedMessage {...messages.noAccount} />
            </Styled.Link>
          </form>
        )}
      </Formik>
    </Styled.Box>
  )
}

const LoginInput = ({ icon: Icon, label, error, inputProps }) => (
  <Styled.InputBox>
    <Icon size="22" />
    <Styled.Wrapper>
      <Styled.Input {...inputProps} />
      <Styled.Label isEmpty={inputProps.value}>{label}</Styled.Label>
    </Styled.Wrapper>
    {error && <Styled.Error color="danger">{error}</Styled.Error>}
  </Styled.InputBox>
)

LoginInput.propTypes = {
  icon: PropTypes.object.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  inputProps: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
  }),
}
LoginInput.defaultProps = {
  label: '',
  error: null,
  inputProps: {
    value: '',
    onBlur: () => {},
    onChange: () => {},
  },
}

Login.propTypes = {
  intl: PropTypes.object.isRequired,
}

export default injectIntl(Login)
