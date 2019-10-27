import React from 'react'

import { storiesOf } from '@storybook/react'

import Checkbox from '.'

storiesOf('Checkbox', module)
  .add('default', () => <Checkbox />)
  .add('default disabled', () => <Checkbox disabled />)
  .add('default checked', () => <Checkbox checked />)
  .add('default with label', () => <Checkbox label="Example label" />)
  .add('default with label checked', () => <Checkbox label="Example label" checked />)
  .add('rounded', () => <Checkbox rounded />)
  .add('rounded disabled', () => <Checkbox disabled rounded />)
  .add('rounded checked', () => <Checkbox checked rounded />)
  .add('rounded label', () => <Checkbox label="Example label" rounded />)
  .add('rounded label checked', () => <Checkbox label="Example label" checked rounded />)
