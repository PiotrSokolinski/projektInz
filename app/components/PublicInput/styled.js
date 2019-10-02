import styled from 'styled-components'
import { Help } from 'react-bulma-components/lib/components/form'
import { Colors } from 'themes'
export const Error = styled(Help)`
  top: -25px;
  position: relative;
`

export const InputBox = styled.div`
  position: relative;
`
export const Input = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: ${Colors.white};
  letter-spacing: 1px;
  margin-bottom: 30px;
  border: none;
  outline: none;
  background: transparent;
  border-bottom: 1px solid ${Colors.white};
  text-indent: ${props => (props.isIcon ? '30px' : '0px')};
`

export const Label = styled.label`
  position: absolute;
  top: ${props => (props.isIcon ? '22px' : '0px')};
  left: ${props => (props.isIcon ? '30px' : '0px')};
  padding: 10px 0;
  font-size: 16px;
  color: ${Colors.white};
  pointer-events: none;
  transition: ${props => (props.isIcon ? '0.5s' : '0.3s')};
  ${props => (props.isValue ? `left: 0; color: ${Colors.cerulean}` : '')};
  ${props => (props.isValue && props.isIcon ? 'top: -15px;' : '')};
  ${props => (props.isValue && !props.isIcon ? 'top: -30px;' : '')};
`

export const Wrapper = styled.div`
  & ${Input}:hover + ${Label} {
    top: ${props => (props.isIcon ? '-15px' : '-30px')};
    left: 0;
    color: ${Colors.cerulean};
  }
`
