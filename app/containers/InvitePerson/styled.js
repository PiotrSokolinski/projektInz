import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

import Checkbox from 'components/Checkbox'

import { Colors } from 'themes'

export const StyledCheckbox = styled(Checkbox)`
  margin-left: 25px;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => (props.alreadyInSystem ? '0' : '20px')};
  border-radius: 5px;
  align-items: center;
  background: ${Colors.white};
  border: ${props => (props.alreadyInSystem ? 'none' : `1px solid ${Colors.edward}`)};
  width: 100%;
`

export const Header = styled.div`
  color: ${Colors.black};
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.02em;
  line-height: 36px;
  text-align: center;
  margin-bottom: 15px;
`

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
  & > div {
    margin-top: 25px;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`

export const Link = styled(RouterLink)`
  outline: none;
  border: none;
  font-size: 15px;
  font-weight: bold;
  color: ${Colors.ecstasy};
  background: transparent;
  cursor: pointer;
  margin-left: 25px;
  &:hover {
    color: ${Colors.ecstasy};
  }
`
