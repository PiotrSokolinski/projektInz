/**
 *
 * ChangePassword
 *
 */

import React from 'react'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'

import Input from 'components/Input'

import messages from './messages'
import { ChangePasswordButton } from './styled'

const initialValues = { password: '', repeatedPassword: '' }

const validationSchema = intl =>
  Yup.object().shape({
    password: Yup.string().required(intl.formatMessage(messages.passwordEmptyError)),
    repeatedPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], intl.formatMessage(messages.passwordsDoNotMatchError))
      .required(intl.formatMessage(messages.passwordConfirmEmpty)),
  })

const ChangePassword = ({ intl }) => (
  <Formik onSubmit={() => {}} initialValues={initialValues} validationSchema={validationSchema(intl)}>
    {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
      <React.Fragment>
        <Input
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
        <Input
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
        <ChangePasswordButton type="submit" onClick={handleSubmit}>
          <FormattedMessage {...messages.changePassword} />
        </ChangePasswordButton>
      </React.Fragment>
    )}
  </Formik>
)

ChangePassword.propTypes = {
  intl: PropTypes.object,
}

export default injectIntl(ChangePassword)
