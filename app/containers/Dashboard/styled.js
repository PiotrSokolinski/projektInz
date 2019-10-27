import styled from 'styled-components'

import { Tasks } from 'styled-icons/fa-solid/Tasks'
import { EventAvailable } from 'styled-icons/material/EventAvailable'
import { ArrowUp } from 'styled-icons/feather/ArrowUp'

import { Colors } from 'themes'

export const TaskIcon = styled(Tasks)`
  color: ${Colors.black};
`
export const EventAvailableIcon = styled(EventAvailable)`
  color: ${Colors.black};
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 75px);
`
export const TabsContainer = styled.div`
  margin-top: 20px;
  width: 45vw;
  margin-right: 25px;
  .react-tabs__tab-list {
    border-bottom: 1px solid ${Colors.edward};
  }
  .react-tabs__tab {
    padding: 6px 25px;
  }
  .react-tabs__tab--selected {
    border: 1px solid ${Colors.edward};
    border-bottom: 1px solid transparent;
    font-weight: bold;
    color: ${Colors.ecstasy};
  }
`

export const GroupInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`

export const GroupName = styled.div`
  font-size: 19px;
  font-weight: bold;
  margin-left: 20px;
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

export const ModalTitleContainer = styled.div`
  display: flex;
  align-items: center;
`
