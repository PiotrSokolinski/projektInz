/*
 * EditGroup Messages
 *
 * This contains all the text for the EditGroup container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.EditGroup'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: `Create your group in our system`,
  },
  photo: {
    id: `${scope}.photo`,
    defaultMessage: `Change group's photo`,
  },
  nameError: {
    id: `${scope}.nameError`,
    defaultMessage: 'Name is required',
  },
  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: 'Group name',
  },
  namePlaceholder: {
    id: `${scope}.namePlaceholder`,
    defaultMessage: 'Type a group name',
  },
  addressLabel: {
    id: `${scope}.addressLabel`,
    defaultMessage: 'Address',
  },
  addressPlaceholder: {
    id: `${scope}.addressLabel`,
    defaultMessage: 'Type an address',
  },
  apartmentNumberLabel: {
    id: `${scope}.apartmentNumberLabel`,
    defaultMessage: 'Number',
  },
  apartmentNumberPlaceholder: {
    id: `${scope}.apartmentNumberPlaceholder`,
    defaultMessage: 'e.g 27',
  },
  zipCodeLabel: {
    id: `${scope}.zipCodeLabel`,
    defaultMessage: 'Zip Code',
  },
  zipCodePlaceholder: {
    id: `${scope}.zipCodePlaceholder`,
    defaultMessage: 'XX-XXX',
  },
  cityLabel: {
    id: `${scope}.cityLable`,
    defaultMessage: 'City',
  },
  cityPlaceholder: {
    id: `${scope}.cityPlaceholder`,
    defaultMessage: 'Type a city',
  },
  countryLabel: {
    id: `${scope}.countryLabel`,
    defaultMessage: 'Country',
  },
  countryPlaceholder: {
    id: `${scope}.countryPlaceholder`,
    defaultMessage: 'Select a country...',
  },
  submitButton: {
    id: `${scope}.submitButton`,
    defaultMessage: 'Save changes to the group',
  },
})
