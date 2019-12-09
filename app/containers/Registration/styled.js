import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import { Colors } from 'themes'
import Button from 'components/Button'

export const Container = styled.div`
  display: flex;
  align-items: center;
`
export const Box = styled.div`
  min-width: 400px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  box-shadow: 10px 10px 10px -5px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
`

export const Header = styled.div`
  font-size: 30px;
  margin: 0 0 30px;
  ${props => props.token && 'margin-bottom: 15px;'};
  padding: 0;
  color: ${Colors.white};
  text-align: center;
`

export const Subheader = styled.div`
  font-size: 16px;
  margin: 0 0 15px;
  color: ${Colors.ecstasy};
  padding: 0;
  text-align: center;
`

export const SubmitButton = styled(Button)`
  width: 100%;
`
export const Link = styled(RouterLink)`
  float: right;
  text-decoration: none;
  color: ${Colors.white};
  font-size: 12px;
  line-height: 20px;
  transition: 0.5s;
  align-self: center;
  margin-top: 15px;
  &:hover {
    color: ${Colors.cerulean};
    transform: scale(1.1);
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
