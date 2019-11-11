import styled from 'styled-components'

import { Colors, Media } from '../../themes'

const getColorForType = props => {
  switch (props.type) {
    case 'error':
      return Colors.red
    case 'warning':
      return Colors.ecstasy
    default:
      return Colors.black
  }
}

const getBackgroundColorForType = props => {
  switch (props.type) {
    case 'error':
      return Colors.errorBackground
    case 'warning':
      return Colors.warningBackground
    default:
      return Colors.transparentBlack
  }
}

export const Container = styled.div`
  align-items: center;
  background-color: ${props => getBackgroundColorForType(props)};
  border-radius: 5px;
  display: flex;
  margin: 20px 0;
  padding: 11px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '300px')};

  ${Media.mobile`
    width: 100%;
  `};
`

export const Icon = styled.img`
  margin-right: 8px;
`

export const Text = styled.p`
  color: ${props => getColorForType(props)};
  font-size: 13px;
  letter-spacing: 0.02em;
  line-height: 19px;
`
