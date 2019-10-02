/*
 * Registration Messages
 *
 * This contains all the text for the Registration container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.Registration'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Sing up',
  },
  buttonTitle: {
    id: `${scope}.buttonTitle`,
    defaultMessage: 'Create an account',
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: 'E-mail address',
  },
  firstNameLabel: {
    id: `${scope}.firstNameLabel`,
    defaultMessage: 'First name',
  },
  lastNameLabel: {
    id: `${scope}.lastNameLabel`,
    defaultMessage: 'Last name',
  },
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Password',
  },
  repeatedPasswordLabel: {
    id: `${scope}.repeatedPasswordLabel`,
    defaultMessage: 'Retype password',
  },
  emailInvalidError: {
    id: `${scope}.emailInvalidError`,
    defaultMessage: 'E-mail address is invalid',
  },
  emailEmptyError: {
    id: `${scope}.emailEmptyError`,
    defaultMessage: 'E-mail address is required',
  },
  firstNameEmptyError: {
    id: `${scope}.firstNameEmptyError`,
    defaultMessage: 'First name is required',
  },
  lastNameEmptyError: {
    id: `${scope}.lastNameEmptyError`,
    defaultMessage: 'Last name is required',
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

  // break - needed???
  errorTitle: {
    id: `${scope}.errorTitle`,
    defaultMessage: 'Something went wrong',
  },
  oneNumberOrSymbol: {
    id: `${scope}.oneNumberOrSymbol`,
    defaultMessage: 'Include at least one number or symbol',
  },
  lowerAndUpperCharacter: {
    id: `${scope}.lowerAndUpperCharacter`,
    defaultMessage: 'Include both lower and upper case latin characters',
  },
  eightCharactersLong: {
    id: `${scope}.eightCharactersLong`,
    defaultMessage: 'Be at least 8 characters long',
  },
  passwordDemands: {
    id: `${scope}.passwordDemands`,
    defaultMessage: 'Your password needs to:',
  },
})
