import styled from 'styled-components'
import { Colors } from '../../themes/index'

export const StyledLabel = styled.label`
  color: ${props => (props.error ? Colors.flamingo : Colors.blueDianne)};
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`
