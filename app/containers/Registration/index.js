/**
 *
 * Registration
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as Yup from 'yup'
import { Formik } from 'formik'
import PublicInput from 'components/PublicInput'
import messages from './messages'
import * as Styled from './styled'

const initialValues = { firstName: '', lastName: '', email: '', password: '', repeatedPassword: '' }

const validationSchema = ({ intl }) =>
  Yup.object().shape({
    email: Yup.string()
      .email(intl.formatMessage(messages.emailInvalidError))
      .required(intl.formatMessage(messages.emailEmptyError)),
    firstName: Yup.string().required(intl.formatMessage(messages.firstNameEmptyError)),
    lastName: Yup.string().required(intl.formatMessage(messages.lastNameEmptyError)),
    password: Yup.string().required(intl.formatMessage(messages.passwordEmptyError)),
    repeatedPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], intl.formatMessage(messages.passwordsDoNotMatchError))
      .required(intl.formatMessage(messages.passwordConfirmEmpty)),
  })

const Registration = ({ intl }) => {
  const submitRegistrationForm = () => {}
  return (
    <Styled.Container>
      <Styled.Box>
        <Styled.Header>
          <FormattedMessage {...messages.header} />
        </Styled.Header>
        <Formik
          onSubmit={submitRegistrationForm}
          initialValues={initialValues}
          validationSchema={validationSchema({ intl })}
        >
          {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
            <form autoComplete="off">
              <PublicInput
                id="firstNameField"
                inputProps={{
                  type: 'text',
                  name: 'firstName',
                  value: values.firstName,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
                error={touched.firstName && errors.firstName}
                label={intl.formatMessage(messages.firstNameLabel)}
              />
              <PublicInput
                id="lastNameField"
                inputProps={{
                  type: 'text',
                  name: 'lastName',
                  value: values.lastName,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
                error={touched.lastName && errors.lastName}
                label={intl.formatMessage(messages.lastNameLabel)}
              />
              <PublicInput
                id="emailField"
                inputProps={{
                  type: 'text',
                  name: 'email',
                  value: values.email,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
                error={touched.email && errors.email}
                label={intl.formatMessage(messages.emailLabel)}
              />
              <PublicInput
                id="passwordField"
                inputProps={{
                  type: 'password',
                  name: 'password',
                  value: values.password,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
                error={touched.password && errors.password}
                label={intl.formatMessage(messages.passwordLabel)}
              />
              <PublicInput
                id="repeatedPasswordField"
                inputProps={{
                  type: 'password',
                  name: 'repeatedPassword',
                  value: values.repeatedPassword,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
                error={touched.repeatedPassword && errors.repeatedPassword}
                label={intl.formatMessage(messages.repeatedPasswordLabel)}
              />
              <Styled.ButtonsContainer>
                <Styled.SubmitButton type="submit" onClick={handleSubmit}>
                  <FormattedMessage {...messages.buttonTitle} />
                </Styled.SubmitButton>
                <Styled.Link to="/login">
                  <FormattedMessage {...messages.backToLogin} />
                </Styled.Link>
              </Styled.ButtonsContainer>
            </form>
          )}
        </Formik>
      </Styled.Box>
    </Styled.Container>
  )
}

Registration.propTypes = {
  intl: PropTypes.object.isRequired,
}

Registration.defaultProps = {}

export default injectIntl(Registration)
