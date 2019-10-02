import styled from 'styled-components'
import { Colors } from '../../themes/index'

export const Input = styled.input`
  box-shadow: none;
  width: 100%;
  height: 50px;
  font-weight: normal;
  text-indent: 15px;
  font-size: 15px;
  line-height: 140%;
  letter-spacing: 0.02em;
  border: 1px solid ${Colors.white};
  box-sizing: border-box;
  outline: none;
`

export const Image = styled.img`
  left: -18px;
  top: -34px;
  float: right;
  position: relative;
`
