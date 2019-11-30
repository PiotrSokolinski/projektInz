import styled, { keyframes } from 'styled-components'
import { Colors } from 'themes'

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

export const StyledSpinner = styled.div`
  border-radius: 50%;
  width: ${props => props.size}em;
  height: ${props => props.size}em;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: ${props => props.border}em solid rgba(247, 136, 30, 0.2);
  border-right: ${props => props.border}em solid rgba(247, 136, 30, 0.2);
  border-bottom: ${props => props.border}em solid rgba(247, 136, 30, 0.2);
  border-left: ${props => props.border}em solid ${Colors.ecstasy};
  transform: translateZ(0);
  animation: ${spin} ${props => props.animation}s infinite linear;
  &:before {
    width: 50%;
    height: 50%;
    background: #ffffff;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`
