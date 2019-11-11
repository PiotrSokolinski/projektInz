/**
 *
 * Login
 *
 */

import React from 'react'
import * as Yup from 'yup'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import head from 'lodash/head'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import { compose, Mutation } from 'react-apollo'

import Button from 'components/Button'
import PublicInput from 'components/PublicInput'
import InformationBox from 'components/InformationBox'
import appLocalStorage from 'utils/localStorage'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'

import messages from './messages'
import * as Styled from './styled'
import LOGIN_MUTATION from './login.gql'
import UserActions from '../../redux/UserRedux'

const initialValues = { email: '', password: '' }

const validationSchema = intl =>
  Yup.object().shape({
    email: Yup.string()
      .email(intl.formatMessage(messages.emailInvalidError))
      .required(intl.formatMessage(messages.emailEmptyError)),
    password: Yup.string().required(intl.formatMessage(messages.passwordEmptyError)),
  })

const Login = ({ intl, history, loginAction, loading, errors, storeUserData }) => {
  const submitLoginForm = async (values, actions) => {
    const result = await loginAction({
      variables: {
        email: values.email,
        password: values.password,
      },
    })

    actions.setSubmitting(false)
    const mutationData = get(result, 'data', null)

    if (!isEmpty(mutationData)) {
      const userData = mutationData.login
      appLocalStorage.saveSession(userData)
      storeUserData(userData)
      history.push('/')
    }
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
          {({ errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  loading={loading && isSubmitting}
                  disabled={loading && isSubmitting}
                >
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
        {!isEmpty(errors) && <InformationBox fullWidth>{head(errors)}</InformationBox>}
      </Styled.Box>
    </Styled.Container>
  )
}

const withMutation = Component => props => (
  <Mutation mutation={LOGIN_MUTATION}>
    {(mutate, { loading, error }) => (
      <Component {...props} loginAction={mutate} loading={loading} errors={formatGraphqlErrors(error)} />
    )}
  </Mutation>
)

Login.propTypes = {
  intl: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loginAction: PropTypes.func,
  errors: PropTypes.array,
  loading: PropTypes.bool,
}

Login.defaultProps = {
  errors: [],
  loading: false,
  loginAction: () => {},
}

const mapDispatchToProps = {
  storeUserData: UserActions.storeData,
}

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withMutation,
  injectIntl,
)(Login)
