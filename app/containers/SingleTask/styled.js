import styled from 'styled-components'
import { ArrowDownThick } from 'styled-icons/typicons/ArrowDownThick'
import { ArrowUp } from 'styled-icons/feather/ArrowUp'

import { Colors } from 'themes'

export const ArrowDown = styled(ArrowDownThick)`
  ${props => props.isShowMore && 'transform: rotate(-180deg)'};
`

const getArrowPosition = props => {
  switch (props.priority) {
    case 'High':
      return ''
    case 'Medium':
      return 'rotate(-90deg)'
    case 'Low':
      return 'rotate(-180deg)'
    default:
      return ''
  }
}

const getArrowColor = props => {
  switch (props.priority) {
    case 'High':
      return 'red'
    case 'Medium':
      return 'orange'
    case 'Low':
      return 'green'
    default:
      return 'red'
  }
}

export const Arrow = styled(ArrowUp)`
  margin-left: 8px;
  transform: ${props => getArrowPosition(props)};
  color: ${props => getArrowColor(props)};
`

export const SingleTaskContainer = styled.div`
  margin: 0 20px;
  border: 1px solid ${Colors.edward};
  margin-top: 20px;
  border-radius: 20px;
`

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 25px;
  margin-top: 5px;
`

export const TaskName = styled.div`
  cursor: pointer;
`

export const Status = styled.div`
  display: flex;
  align-items: center;
`

const getDotBackgroundColor = props => {
  switch (props.status) {
    case 'To Do':
      return 'red'
    case 'In Progress':
      return 'orange'
    case 'Done':
      return 'green'
    default:
      return 'red'
  }
}

export const Dot = styled.div`
  background-color: ${props => getDotBackgroundColor(props)};
  border-radius: 50%;
  height: 8px;
  margin-right: 8px;
  margin-left: 8px;
  width: 8px;
`

export const PersonContainer = styled.div`
  display: flex;
  align-items: center;
`

export const FullNameContainer = styled.div`
  margin-right: 10px;
`

export const ShowMoreContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const ShowMoreButton = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  height: 20px;
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 25px;
  margin-top: 5px;
`

export const Description = styled.div``

export const Priority = styled.div``

export const PriorityContainer = styled.div`
  display: flex;
  align-items: center;
`

export const CreatedAtContainer = styled.div`
  display: flex;
  align-items: center;
`

export const CreatedAt = styled.div`
  margin-left: 5px;
`
