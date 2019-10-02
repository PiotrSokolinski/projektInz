/*
 * PasswordReset Messages
 *
 * This contains all the text for the PasswordReset container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.PasswordReset'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Set a new password',
  },
  passwordEmptyError: {
    id: `${scope}.passwordEmptyError`,
    defaultMessage: 'Password is required',
  },
  passwordsDoNotMatchError: {
    id: `${scope}.passwordsDoNotMatchError`,
    defaultMessage: 'Passwords must match',
  },
  passwordConfirmEmpty: {
    id: `${scope}.passwordConfirmEmpty`,
    defaultMessage: 'Password confirm is required',
  },
  backToLogin: {
    id: `${scope}.backToLogin`,
    defaultMessage: 'Back to Login',
  },
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Password',
  },
  repeatedPasswordLabel: {
    id: `${scope}.repeatedPasswordLabel`,
    defaultMessage: 'Retype password',
  },
  resetButton: {
    id: `${scope}.resetButton`,
    defaultMessage: 'Reset password',
  },
})
