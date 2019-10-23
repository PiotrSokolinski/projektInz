import React from 'react'
import faker from 'faker'

import { storiesOf } from '@storybook/react'

import Select from '.'

const options = [
  {
    value: faker.random.number(),
    label: faker.name.findName(),
  },
  {
    value: faker.random.number(),
    label: faker.name.findName(),
  },
]

storiesOf('Select', module)
  .add('Select without data', () => <Select label="Label" />)
  .add('Select with data', () => <Select label="Label" options={options} />)
  .add('Select with error', () => <Select label="Label" error="Error" />)
  .add('Select with multiselect', () => <Select label="Label" options={options} isMulti />)
