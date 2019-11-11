import styled from 'styled-components'
import { WindowClose } from 'styled-icons/fa-regular/WindowClose'
import { motion } from 'framer-motion'
import { Colors } from '../../themes/index'

export const Close = styled(WindowClose)`
  color: ${Colors.black};
  cursor: pointer;
`

export const Background = styled(motion.div)`
  z-index: 102;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Container = styled(motion.div)`
  border-radius: 5px;
  max-width: ${({ maxWidth }) => maxWidth}px;
  max-height: 100%;
  width: 100%;
  min-width: 300px;
  min-height: 200px;
  background-color: ${Colors.white};
  padding: 20px;
  display: flex;
  overflow: auto;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  padding-bottom: 30px;
  width: 100%;
`
export const Title = styled.h1`
  color: ${Colors.black};
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0.02em;
  flex: 1;
`

export const Description = styled.h3`
  color: ${Colors.black};
  font-size: 13px;
  line-height: 140%;
  letter-spacing: 0.02em;
  flex: 1;
  ${props => props.isConfirmation && 'margin-top: 30px;'}
`

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  height: 15px;
  margin-left: 25px;
  outline: none;
  padding: 0;
  width: 15px;
`
export const CloseIcon = styled.img`
  flex: 1;
  object-fit: contain;
`

export const Content = styled.div`
  flex: 1;
`

export const TextContainer = styled.div`
  flex: 1;
`
