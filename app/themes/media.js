import { css } from 'styled-components'

import Metrics from './metrics'

const Media = {}

Object.keys(Metrics.breakpoints).forEach(breakpointKey => {
  Media[breakpointKey] = (...args) => css`
    @media (max-width: ${Metrics.breakpoints[breakpointKey]}) {
      ${css(...args)}
    }
  `
})

export default Media
