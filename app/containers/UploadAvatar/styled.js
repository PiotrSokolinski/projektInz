import styled from 'styled-components'
import { Link } from 'react-router-dom'

import ButtonComponent from 'components/Button'

import { Colors } from '../../themes'

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

export const Avatar = styled.div`
  margin: 50px auto;
`

export const Container = styled.div`
  align-items: center;
  background: ${Colors.white};
  border: 1px solid ${Colors.edward};
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 550px;
  padding: 60px 100px;
  border-radius: 5px;
`

export const Header = styled.div`
  color: ${Colors.black};
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.02em;
  line-height: 36px;
  text-align: center;
`

export const SkipLink = styled(Link)`
  color: ${Colors.ecstasy};
  font-family: Poppins;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 0.02em;
  line-height: 19px;
  text-align: center;
  &:hover {
    color: ${Colors.ecstasy};
  }
`

export const Button = styled(ButtonComponent)`
  margin: 0 10px;
`

export const ButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 20px;
`
