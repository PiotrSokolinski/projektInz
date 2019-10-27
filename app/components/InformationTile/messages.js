/*
 * InformationTile Messages
 *
 * This contains all the text for the InformationTile component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.InformationTile'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the InformationTile component!',
  },
  upToDate: {
    id: `${scope}.upToDate`,
    defaultMessage: 'You are up to date!',
  },
})
