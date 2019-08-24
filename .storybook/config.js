import { configure } from '@storybook/react'

function loadStories() {
  const req = require.context('../app', true, /\.story\.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
