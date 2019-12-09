/**
 *
 * PasswordReset
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import head from 'lodash/head'
import * as Yup from 'yup'
import queryString from 'query-string'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'
import { compose, Mutation } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'
import PublicInput from 'components/PublicInput'
import InformationBox from 'components/InformationBox'

import messages from './messages'
import * as Styled from './styled'
import SET_PASSWORD_MUTATION from './setPassword.gql'

const initialValues = { password: '', repeatedPassword: '' }

const validationSchema = intl =>
  Yup.object().shape({
    password: Yup.string().required(intl.formatMessage(messages.passwordEmptyError)),
    repeatedPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], intl.formatMessage(messages.passwordsDoNotMatchError))
      .required(intl.formatMessage(messages.passwordConfirmEmpty)),
  })

const PasswordReset = ({ intl, history, setPasswordAction, loading, errors, location }) => {
  const token = queryString.parse(location.search).token
  if (!token) return <Redirect to="/login" />
  const setNewPassword = async (values, actions) => {
    const result = await setPasswordAction({
      variables: {
        newPassword: values.password,
        resetPasswordToken: token,
      },
    })
    actions.setSubmitting(false)
    const mutationSuccess = get(result, 'data.setPassword.success', null)
    if (mutationSuccess) history.push('/login')
  }
  return (
    <Styled.Container>
      <Styled.Box>
        <Styled.Header>
          <FormattedMessage {...messages.header} />
        </Styled.Header>
        <Formik onSubmit={setNewPassword} initialValues={initialValues} validationSchema={validationSchema(intl)}>
          {({ errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
                <Styled.ResetButton
                  type="submit"
                  onClick={handleSubmit}
                  loading={loading && isSubmitting}
                  disabled={loading && isSubmitting}
                >
                  <FormattedMessage {...messages.resetButton} />
                </Styled.ResetButton>
                <Styled.Link to="/login">
                  <FormattedMessage {...messages.backToLogin} />
                </Styled.Link>
              </Styled.ButtonsContainer>
            </React.Fragment>
          )}
        </Formik>
        {!isEmpty(errors) && <InformationBox fullWidth>{head(errors)}</InformationBox>}
      </Styled.Box>
    </Styled.Container>
  )
}

const withMutation = Component => props => (
  <Mutation mutation={SET_PASSWORD_MUTATION}>
    {(mutate, { loading, error }) => (
      <Component {...props} setPasswordAction={mutate} loading={loading} errors={formatGraphqlErrors(error)} />
    )}
  </Mutation>
)

PasswordReset.propTypes = {
  intl: PropTypes.object,
  errors: PropTypes.array,
  loading: PropTypes.bool,
  setPasswordAction: PropTypes.func,
}

PasswordReset.defaultProps = {
  errors: [],
  loading: false,
  setPasswordAction: () => {},
}

export default compose(
  withMutation,
  injectIntl,
)(PasswordReset)
