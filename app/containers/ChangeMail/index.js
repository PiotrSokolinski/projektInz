/**
 *
 * ChangeMail
 *
 */

import React from 'react'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'

import Input from 'components/Input'

import messages from './messages'
import { ChangeMailButton } from './styled'

const initialValues = { email: '', repeatedEmail: '' }

const validationSchema = intl =>
  Yup.object().shape({
    email: Yup.string().required(intl.formatMessage(messages.emailEmptyError)),
    repeatedEmail: Yup.string()
      .oneOf([Yup.ref('password'), null], intl.formatMessage(messages.emailsDoNotMatchError))
      .required(intl.formatMessage(messages.emailConfirmEmpty)),
  })

const ChangeMail = ({ intl }) => (
  <Formik onSubmit={() => {}} initialValues={initialValues} validationSchema={validationSchema(intl)}>
    {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
      <React.Fragment>
        <Input
          id="emailField"
          label={intl.formatMessage(messages.emailLabel)}
          error={touched.email && errors.email}
          inputProps={{
            type: 'password',
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
            type: 'password',
            name: 'repeatedEmail',
            value: values.repeatedEmail,
            onChange: handleChange,
            onBlur: handleBlur,
          }}
        />
        <ChangeMailButton type="submit" onClick={handleSubmit}>
          <FormattedMessage {...messages.changeEmail} />
        </ChangeMailButton>
      </React.Fragment>
    )}
  </Formik>
)

ChangeMail.propTypes = {
  intl: PropTypes.object,
}

export default injectIntl(ChangeMail)
