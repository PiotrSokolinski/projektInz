import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Home } from 'styled-icons/fa-solid/Home'
import { Task } from 'styled-icons/boxicons-regular/Task'
import { Calendar } from 'styled-icons/boxicons-regular/Calendar'
import { Settings } from 'styled-icons/material/Settings'
import { Colors } from 'themes'

export const Container = styled.div`
  height: 100vh;
  transition: width 0.5s;
  width: ${props => (props.isSidebarOpen ? '200px' : '60px')};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  border-right: 1px solid ${Colors.silverChalice};
  background: ${Colors.aquaHaze};
  a:first-of-type {
    margin-top: 25px;
  }
`

export const HamburgerMenu = styled.div`
  cursor: pointer;
  width: 30px;
  margin-left: 15px;
  margin-top: 8px;
  z-index: 1001;
  &::after,
  &::before,
  div {
    background-color: ${Colors.white};
    border-radius: 2px;
    content: '';
    display: block;
    height: 4px;
    margin: 5px 0;
    transition: all 0.2s ease-in-out;
  }
  &::after {
    ${props => (props.isSidebarOpen ? 'transform: translateY(-6px) rotate(-135deg);' : '')};
  }
  &::before {
    ${props => (props.isSidebarOpen ? 'transform: translateY(12px) rotate(135deg);' : '')};
  }
  div {
    ${props => (props.isSidebarOpen ? 'transform: scale(0);' : '')};
  }
`

export const LinkElement = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 25px;
  margin-left: 8px;
`
export const Text = styled.div`
  color: ${Colors.black};
  margin-left: 15px;
  ${props => (props.isActive ? `color: ${Colors.cerulean};` : '')};
`

export const HomeIcon = styled(Home)`
  color: ${Colors.black};
  ${props => (props.isActive ? `color: ${Colors.cerulean};` : '')};
`
export const TaskIcon = styled(Task)`
  color: ${Colors.black};
  ${props => (props.isActive ? `color: ${Colors.cerulean};` : '')};
`

export const CalendarIcon = styled(Calendar)`
  color: ${Colors.black};
  ${props => (props.isActive ? `color: ${Colors.cerulean};` : '')};
`
export const SettingsIcon = styled(Settings)`
  color: ${Colors.black};
  ${props => (props.isActive ? `color: ${Colors.cerulean};` : '')};
`
