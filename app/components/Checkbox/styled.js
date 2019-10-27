import styled from 'styled-components'

import { Tick } from 'styled-icons/typicons/Tick'

import { Colors } from '../../themes/index'

const getCheckboxColor = props => {
  if (props.checked) return Colors.cerulean
  if (props.rounded) return Colors.edward
  if (props.isBackgroundGray) return Colors.concrete
  return Colors.white
}

export const TickIcon = styled(Tick)`
  color: ${Colors.white};
  margin-top: -3px;
`

export const Container = styled.label`
  color: ${Colors.black};
  cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
  display: flex;
  font-size: 13px;
  letter-spacing: 0.02em;
  line-height: 19px;
  user-select: none;
  .checkmark {
    background: ${props => getCheckboxColor(props)};
  }
`

export const Input = styled.input`
  opacity: 0;
  height: 0;
  width: 0;
`

export const Checkmark = styled.span`
  border-radius: ${props => (props.rounded ? '100px' : '3px')};
  border: 1px solid ${props => (props.rounded ? 'transparent' : Colors.coral)};
  display: flex;
  height: 18px;
  justify-content: space-around;
  margin-right: 6px;
  width: 18px;

  ${props =>
    props.disabled &&
    !props &&
    `
    border-color: ${Colors.edward};
  `}
`

export const Label = styled.span`
  ${props => (props.checked ? 'font-weight: bold;' : '')};
  &::after {
    display: block;
    content: attr(label);
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
`
