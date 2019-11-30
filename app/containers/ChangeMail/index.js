/**
 *
 * ChangeMail
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
import { ChangeMailButton } from './styled'
import CHANGE_EMAIL_MUTATION from './changeMail.gql'

const initialValues = { email: '', repeatedEmail: '' }

const validationSchema = intl =>
  Yup.object().shape({
    email: Yup.string().required(intl.formatMessage(messages.emailEmptyError)),
    repeatedEmail: Yup.string()
      .oneOf([Yup.ref('email'), null], intl.formatMessage(messages.emailsDoNotMatchError))
      .required(intl.formatMessage(messages.emailConfirmEmpty)),
  })

const ChangeMail = ({ intl, password, changeEmailAction, loading, errors, onClose }) => {
  const submitChangeEmail = async (values, actions) => {
    await changeEmailAction({
      variables: {
        password,
        email: values.email,
      },
    })
    actions.setSubmitting(false)
    onClose()
  }
  return (
    <React.Fragment>
      <Formik onSubmit={submitChangeEmail} initialValues={initialValues} validationSchema={validationSchema(intl)}>
        {({ errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <React.Fragment>
            <Input
              id="emailField"
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
            <Input
              id="emailPasswordField"
              label={intl.formatMessage(messages.repeatedEmailLabel)}
              error={touched.repeatedEmail && errors.repeatedEmail}
              inputProps={{
                type: 'text',
                name: 'repeatedEmail',
                value: values.repeatedEmail,
                onChange: handleChange,
                onBlur: handleBlur,
              }}
            />
            <ChangeMailButton
              type="submit"
              onClick={handleSubmit}
              loading={loading && isSubmitting}
              disabled={loading && isSubmitting}
            >
              <FormattedMessage {...messages.changeEmail} />
            </ChangeMailButton>
          </React.Fragment>
        )}
      </Formik>
      {!isEmpty(errors) && <InformationBox fullWidth>{head(errors)}</InformationBox>}
    </React.Fragment>
  )
}

ChangeMail.propTypes = {
  intl: PropTypes.object,
  changeEmailAction: PropTypes.func,
  errors: PropTypes.array,
  loading: PropTypes.bool,
  password: PropTypes.string,
}

ChangeMail.defaultProps = {
  errors: [],
  loading: false,
  changeEmailAction: () => {},
}

const withMutation = Component => props => (
  <Mutation mutation={CHANGE_EMAIL_MUTATION}>
    {(mutate, { loading, error }) => (
      <Component {...props} changeEmailAction={mutate} loading={loading} errors={formatGraphqlErrors(error)} />
    )}
  </Mutation>
)

export default compose(
  withMutation,
  injectIntl,
)(ChangeMail)
