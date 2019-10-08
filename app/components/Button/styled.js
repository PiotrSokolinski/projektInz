import styled from 'styled-components'
import { Colors } from 'themes'

const invertedStyles = `
  color: ${Colors.cerulean};
  background: ${Colors.white};
  border: 1px solid ${Colors.cerulean}
  &:hover {
    color: ${Colors.white};
    background: ${Colors.cerulean};
  }

`

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  color: ${Colors.white};
  background: ${Colors.cerulean};
  cursor: pointer;
  border-radius: 5px;
  transition: 0.5s;
  font-size: 13px;
  width: 150px;
  height: 40px;
  ${props => !props.stable && '&:hover { transform: scale(1.1); filter: brightness(75%);}'};
  ${props => (props.inverted ? invertedStyles : '')}
`
