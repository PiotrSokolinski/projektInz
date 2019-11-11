import styled, { keyframes } from 'styled-components'

const spin = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`
export const Container = styled.div`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
`

export const RotationAnimationBox = styled.div`
  animation: ${({ duration }) => duration}s ${spin} linear infinite;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: absolute;
`
