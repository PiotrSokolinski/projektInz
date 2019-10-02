import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import { Lock } from 'styled-icons/material'
import { User } from 'styled-icons/boxicons-solid'
import { Colors } from 'themes'
import { UserPin } from 'styled-icons/boxicons-regular/UserPin'

export const Avatar = styled(UserPin)`
  margin-top: -25px;
  color: white;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
`
export const Box = styled.div`
  width: 400px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  box-shadow: 10px 10px 10px -5px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
`

export const Header = styled.div`
  font-size: 30px;
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
`

const icon = `
  width: 25px;
  float: left;
  text-align: center;
  color: ${Colors.darkBlue};
  top: 30px;
  position: relative;
`

export const UserIcon = styled(User)`
  ${icon}
`
export const LockIcon = styled(Lock)`
  ${icon}
`

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: -75px;
`

export const Link = styled(RouterLink)`
  float: right;
  text-decoration: none;
  color: white;
  font-size: 12px;
  line-height: 20px;
  transition: 0.5s;
  &:hover {
    color: #03a9f4;
    transform: scale(1.1);
  }
`
