/*
 * Login Messages
 *
 * This contains all the text for the Login container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.Login'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Sing in',
  },
  buttonTitle: {
    id: `${scope}.buttonTitle`,
    defaultMessage: 'Login',
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: 'E-mail address',
  },
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Password',
  },
  emailInvalidError: {
    id: `${scope}.emailInvalidError`,
    defaultMessage: 'E-mail address is invalid',
  },
  emailEmptyError: {
    id: `${scope}.emailEmptyError`,
    defaultMessage: 'E-mail address is required',
  },
  passwordEmptyError: {
    id: `${scope}.passwordEmptyError`,
    defaultMessage: 'Password is required',
  },
  forgotPasswordMessage: {
    id: `${scope}.forgotPasswordMessage`,
    defaultMessage: 'Lost your password?',
  },
  errorTitle: {
    id: `${scope}.errorTitle`,
    defaultMessage: 'Something went wrong',
  },
  noAccount: {
    id: `${scope}.noAccount`,
    defaultMessage: `Don't have an account?`,
  },
})
