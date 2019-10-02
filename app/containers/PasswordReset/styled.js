import styled from 'styled-components'
import Button from 'components/Button'
import { Link as RouterLink } from 'react-router-dom'
import { Colors } from 'themes'

export const ResetButton = styled(Button)`
  width: 100%;
`

export const Container = styled.div`
  display: flex;
  flex-directiom: column;
  justify-content: center;
  align-items: center;
`

export const Box = styled.div`
  padding: 40px;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  box-shadow: 10px 10px 10px -5px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
`

export const Header = styled.div`
  color: ${Colors.white};
  font-size: 30px;
  margin: 0 0 30px;
  padding: 0;
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
