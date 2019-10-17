/*
 * ChangePassword Messages
 *
 * This contains all the text for the ChangePassword container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.ChangePassword'

export default defineMessages({
  retypePasswordLabel: {
    id: `${scope}.retypePasswordLabel`,
    defaultMessage: 'Retype your new password ',
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
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Password',
  },
  repeatedPasswordLabel: {
    id: `${scope}.repeatedPasswordLabel`,
    defaultMessage: 'Retype password',
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Change password',
  },
})
