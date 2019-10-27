/*
 * InvitePerson Messages
 *
 * This contains all the text for the InvitePerson container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.InvitePerson'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Invite first members to your group',
  },
  systemHeader: {
    id: `${scope}.systemHeader`,
    defaultMessage: 'Invite a new member to your group',
  },
  person1Label: {
    id: `${scope}.person1Label`,
    defaultMessage: 'Person 1',
  },
  person2Label: {
    id: `${scope}.person2Label`,
    defaultMessage: 'Person 2',
  },
  person3Label: {
    id: `${scope}.person3Label`,
    defaultMessage: 'Person 3',
  },
  inputPlaceholder: {
    id: `${scope}.inputPlaceholder`,
    defaultMessage: 'e.g. john.smith@contact.com',
  },
  emailInvalidError: {
    id: `${scope}.emailInvalidError`,
    defaultMessage: 'E-mail address is invalid',
  },
  buttonTitle: {
    id: `${scope}.emailInvalidError`,
    defaultMessage: 'Send invitations',
  },
  skip: {
    id: `${scope}.skip`,
    defaultMessage: 'Skip for now',
  },
  anotherOne: {
    id: `${scope}.anotherOne`,
    defaultMessage: 'Invite another person',
  },
  universalLabel: {
    id: `${scope}.universalLabel`,
    defaultMessage: 'New person',
  },
})
