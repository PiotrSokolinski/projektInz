import styled from 'styled-components'
import { Colors } from 'themes'

export const StyledButton = styled.button`
  border: none;
  outline: none;
  color: ${Colors.white};
  background: ${Colors.cerulean};
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.5s;
  font-size: 13px;
  width: 150px;
  height: 40px;
  &:hover {
    transform: scale(1.1);
    filter: brightness(75%);
  }
`
