/*
 * PasswordRemind Messages
 *
 * This contains all the text for the PasswordRemind container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.PasswordRemind'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Reset password',
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: 'E-mail address',
  },
  sendButton: {
    id: `${scope}.sendButton`,
    defaultMessage: 'Send reset link',
  },
  backToLogin: {
    id: `${scope}.backToLogin`,
    defaultMessage: 'Back to Login',
  },
  emailInvalidError: {
    id: `${scope}.emailInvalidError`,
    defaultMessage: 'E-mail address is invalid',
  },
  emailEmptyError: {
    id: `${scope}.emailEmptyError`,
    defaultMessage: 'E-mail address is required',
  },
})
