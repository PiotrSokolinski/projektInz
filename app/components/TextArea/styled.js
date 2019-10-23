import styled from 'styled-components'
import { Colors } from 'themes'

export const TextArea = styled.textarea`
  resize: none;
  outline: none;
  width: 100%;
  border: 1px solid ${Colors.silverChalice};
  border-radius: 5px;
  height: 100px;
  padding: 10px 15px;
  font-size: 15px;
  line-height: 140%;
  letter-spacing: 0.02em;
  box-sizing: border-box;
`
