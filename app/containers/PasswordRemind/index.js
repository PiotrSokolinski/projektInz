/**
 *
 * PasswordRemind
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import head from 'lodash/head'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { compose, Mutation } from 'react-apollo'
import { FormattedMessage, injectIntl } from 'react-intl'

import InformationBox from 'components/InformationBox'
import PublicInput from 'components/PublicInput'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'

import messages from './messages'
import * as Styled from './styled'
import REQUEST_PASSWORD_RESET_MUTATION from './requestPasswordReset.gql'

const initialValues = { email: '' }

const validationSchema = intl =>
  Yup.object().shape({
    email: Yup.string()
      .email(intl.formatMessage(messages.emailInvalidError))
      .required(intl.formatMessage(messages.emailEmptyError)),
  })

const PasswordRemind = ({ intl, requestPasswordResetAction, loading, errors }) => {
  const sendResetLink = async (values, actions) => {
    const result = await requestPasswordResetAction({
      variables: { email: values.email },
    })
    actions.setSubmitting(false)
    const mutationSuccess = get(result, 'data.requestPasswordReset.success', null)

    if (mutationSuccess) alert('Link sent')
    actions.resetForm(initialValues)
  }
  return (
    <Styled.Container>
      <Styled.Box>
        <Styled.Header>
          <FormattedMessage {...messages.header} />
        </Styled.Header>
        <Formik onSubmit={sendResetLink} initialValues={initialValues} validationSchema={validationSchema(intl)}>
          {({ errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
                <Styled.SendButton
                  type="submit"
                  onClick={handleSubmit}
                  loading={loading && isSubmitting}
                  disabled={loading && isSubmitting}
                >
                  <FormattedMessage {...messages.sendButton} />
                </Styled.SendButton>
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
  <Mutation mutation={REQUEST_PASSWORD_RESET_MUTATION}>
    {(mutate, { loading, error }) => (
      <Component {...props} requestPasswordResetAction={mutate} loading={loading} errors={formatGraphqlErrors(error)} />
    )}
  </Mutation>
)

PasswordRemind.propTypes = {
  intl: PropTypes.object.isRequired,
  errors: PropTypes.array,
  loading: PropTypes.bool,
  requestPasswordResetAction: PropTypes.func,
}

PasswordRemind.defaultProps = {
  errors: [],
  loading: false,
  requestPasswordResetAction: () => {},
}

export default compose(
  withMutation,
  injectIntl,
)(PasswordRemind)
