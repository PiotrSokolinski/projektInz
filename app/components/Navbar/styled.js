import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AccountBox } from 'styled-icons/material/AccountBox'
import { LogOut } from 'styled-icons/boxicons-regular/LogOut'
import { Colors } from 'themes'

export const Container = styled.div`
  align-items: center;
  background: red;
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 0 25px;
  z-index: 1000;
  position: fixed;
  width: 100%;
  background: linear-gradient(-45deg, #1e5799 19%, #2989d8 48%, #207cca 60%, #7db9e8 100%);
`

export const LinkElement = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const RightElementsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${LinkElement}:first-of-type {
    margin-right: 50px;
  }
`

export const Text = styled.div`
  color: ${Colors.white};
  margin-right: 5px;
`

export const Account = styled(AccountBox)`
  color: ${Colors.white};
  margin-left: 10px;
`

export const Logout = styled(LogOut)`
  color: ${Colors.white};
  margin-left: 10px;
  transform: rotate(180deg);
`

export const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 700px;
`
