/**
 *
 * ChangePassword
 *
 */

import React from 'react'
import * as Yup from 'yup'
import isEmpty from 'lodash/isEmpty'
import head from 'lodash/head'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'
import { compose, Mutation } from 'react-apollo'

import InformationBox from 'components/InformationBox'
import Input from 'components/Input'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'

import messages from './messages'
import { ChangePasswordButton } from './styled'
import CHANGE_PASSWORD_MUTATION from './changePassword.gql'

const initialValues = { password: '', repeatedPassword: '' }

const validationSchema = intl =>
  Yup.object().shape({
    password: Yup.string().required(intl.formatMessage(messages.passwordEmptyError)),
    repeatedPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], intl.formatMessage(messages.passwordsDoNotMatchError))
      .required(intl.formatMessage(messages.passwordConfirmEmpty)),
  })

const ChangePassword = ({ intl, password, changePasswordAction, loading, errors, onClose }) => {
  console.log(onClose)
  const submitChangePassword = async (values, actions) => {
    await changePasswordAction({
      variables: {
        password,
        newPassword: values.password,
      },
    })
    actions.setSubmitting(false)
    onClose()
  }
  return (
    <React.Fragment>
      <Formik onSubmit={submitChangePassword} initialValues={initialValues} validationSchema={validationSchema(intl)}>
        {({ errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
            <ChangePasswordButton
              type="submit"
              onClick={handleSubmit}
              loading={loading && isSubmitting}
              disabled={loading && isSubmitting}
            >
              <FormattedMessage {...messages.changePassword} />
            </ChangePasswordButton>
          </React.Fragment>
        )}
      </Formik>
      {!isEmpty(errors) && <InformationBox fullWidth>{head(errors)}</InformationBox>}
    </React.Fragment>
  )
}

ChangePassword.propTypes = {
  intl: PropTypes.object,
  changePasswordAction: PropTypes.func,
  errors: PropTypes.array,
  loading: PropTypes.bool,
  password: PropTypes.string,
}

ChangePassword.defaultProps = {
  errors: [],
  loading: false,
  changePasswordAction: () => {},
}

const withMutation = Component => props => (
  <Mutation mutation={CHANGE_PASSWORD_MUTATION}>
    {(mutate, { loading, error }) => (
      <Component {...props} changePasswordAction={mutate} loading={loading} errors={formatGraphqlErrors(error)} />
    )}
  </Mutation>
)

export default compose(
  withMutation,
  injectIntl,
)(ChangePassword)
