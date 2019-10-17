/*
 * Settings Messages
 *
 * This contains all the text for the Settings container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.Settings'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Account Settings',
  },
  firstNameLabel: {
    id: `${scope}.firstNameLabel`,
    defaultMessage: 'First Name',
  },
  lastNameLabel: {
    id: `${scope}.lastNameLabel`,
    defaultMessage: 'Last Name',
  },
  nickLabel: {
    id: `${scope}.nickLabel`,
    defaultMessage: 'Nick',
  },
  editPhoto: {
    id: `${scope}.editPhoto`,
    defaultMessage: 'Edit Profile Photo',
  },
  firstNameEmptyError: {
    id: `${scope}.firstNameEmptyError`,
    defaultMessage: 'First name can not be empty',
  },
  lastNameEmptyError: {
    id: `${scope}.lastNameEmptyError`,
    defaultMessage: 'Last name can not be empty',
  },
  editDetails: {
    id: `${scope}.editDetails`,
    defaultMessage: 'Edit details',
  },
  submitChanges: {
    id: `${scope}.submitChanges`,
    defaultMessage: 'Submit changes',
  },
  changeMailTitle: {
    id: `${scope}.changeMailTitle`,
    defaultMessage: 'Chagne your e-mail address',
  },
  chagnePasswordTitle: {
    id: `${scope}.chagnePasswordTitle`,
    defaultMessage: 'Chagne your password',
  },
  changeMail: {
    id: `${scope}.changeMail`,
    defaultMessage: 'Change e-mail',
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Change password',
  },
  changePasswordTitle: {
    id: `${scope}.changePasswordTitle`,
    defaultMessage: 'Set a new password',
  },
  setMailTitle: {
    id: `${scope}.changeMailTitle`,
    defaultMessage: 'Set a new e-mail address',
  },
  userCredentials: {
    id: `${scope}.userCredentials`,
    defaultMessage: `User's Credentials`,
  },
})
