import styled from 'styled-components'
import { Colors } from 'themes'

export const StyledLabel = styled.label`
  color: ${props => (props.error ? 'red' : Colors.black)};
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`
