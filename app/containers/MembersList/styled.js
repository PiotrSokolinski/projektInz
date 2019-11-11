import styled from 'styled-components'
import { Colors } from 'themes'

export const Container = styled.div`
  background: ${Colors.concrete};
  padding: 10px 0;
  border: 1px solid ${Colors.edward};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  &.inputs-container {
    margin-top: -20px;
  }
`

export const TextButton = styled.button`
  outline: none;
  border: none;
  font-size: 15px;
  font-weight: bold;
  color: ${Colors.ecstasy};
  background: transparent;
  cursor: pointer;
`
