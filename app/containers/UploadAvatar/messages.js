/*
 * UploadAvatar Messages
 *
 * This contains all the text for the UploadAvatar container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.UploadAvatar'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Welcome to Housier, please upload your photo.',
  },
  skip: {
    id: `${scope}.skip`,
    defaultMessage: 'Skip for now',
  },
  uploadPhoto: {
    id: `${scope}.uploadPhoto`,
    defaultMessage: 'Upload Photo',
  },
  changePhoto: {
    id: `${scope}.changePhoto`,
    defaultMessage: 'Change Photo',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save Photo',
  },
})
