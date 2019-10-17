/*
 * ChangeMail Messages
 *
 * This contains all the text for the ChangeMail container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.ChangeMail'

export default defineMessages({
  retypeEmailLabel: {
    id: `${scope}.retypeEmailLabel`,
    defaultMessage: 'Retype your new e-mail address ',
  },
  emailEmptyError: {
    id: `${scope}.emailEmptyError`,
    defaultMessage: 'E-mail address is required',
  },
  emailsDoNotMatchError: {
    id: `${scope}.emailsDoNotMatchError`,
    defaultMessage: 'E-mail addresses must match',
  },
  emailConfirmEmpty: {
    id: `${scope}.emailConfirmEmpty`,
    defaultMessage: 'E-mail address confirm is required',
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: 'E-mail address',
  },
  repeatedEmailLabel: {
    id: `${scope}.repeatedEmailLabel`,
    defaultMessage: 'Retype e-mail address',
  },
  changeEmail: {
    id: `${scope}.changeEmail`,
    defaultMessage: 'Change e-mail address',
  },
})
