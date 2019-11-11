/**
 *
 * Registration
 *
 */

import React from 'react'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import head from 'lodash/head'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { FormattedMessage, injectIntl } from 'react-intl'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'
import { connect } from 'react-redux'
import appLocalStorage from 'utils/localStorage'
import { compose, Mutation } from 'react-apollo'
import { Formik } from 'formik'
import InformationBox from 'components/InformationBox'
import PublicInput from 'components/PublicInput'
import messages from './messages'
import * as Styled from './styled'
import REGISTER_MUTATION from './register.gql'
import UserActions from '../../redux/UserRedux'

const initialValues = { firstName: '', lastName: '', email: '', password: '', repeatedPassword: '' }

const validationSchema = intl =>
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

const Registration = ({ intl, history, registerAction, loading, errors, storeUserData }) => {
  const submitRegistrationForm = async (values, actions) => {
    const data = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
    }
    const result = await registerAction({
      variables: { data },
    })
    actions.setSubmitting(false)
    const mutationData = get(result, 'data', null)

    if (!isEmpty(mutationData)) {
      const userData = mutationData.register
      appLocalStorage.saveSession(userData)
      storeUserData(userData)
      history.push('/upload-avatar')
    }
  }
  return (
    <Styled.Container>
      <Styled.Box>
        <Styled.Header>
          <FormattedMessage {...messages.header} />
        </Styled.Header>
        <Formik
          onSubmit={submitRegistrationForm}
          initialValues={initialValues}
          validationSchema={validationSchema(intl)}
        >
          {({ errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
                <Styled.SubmitButton
                  type="submit"
                  onClick={handleSubmit}
                  loading={loading && isSubmitting}
                  disabled={loading && isSubmitting}
                >
                  <FormattedMessage {...messages.buttonTitle} />
                </Styled.SubmitButton>
                <Styled.Link to="/login">
                  <FormattedMessage {...messages.backToLogin} />
                </Styled.Link>
              </Styled.ButtonsContainer>
            </form>
          )}
        </Formik>
        {!isEmpty(errors) && <InformationBox fullWidth>{head(errors)}</InformationBox>}
      </Styled.Box>
    </Styled.Container>
  )
}

const withMutation = Component => props => (
  <Mutation mutation={REGISTER_MUTATION}>
    {(mutate, { loading, error }) => (
      <Component {...props} registerAction={mutate} loading={loading} errors={formatGraphqlErrors(error)} />
    )}
  </Mutation>
)

Registration.propTypes = {
  intl: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  registerAction: PropTypes.func,
  errors: PropTypes.array,
  loading: PropTypes.bool,
}

Registration.defaultProps = {
  errors: [],
  loading: false,
  registerAction: () => {},
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
)(Registration)
