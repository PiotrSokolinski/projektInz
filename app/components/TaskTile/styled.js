import styled from 'styled-components'
import { Trash } from 'styled-icons/boxicons-regular/Trash'

import Select from 'components/Select'
import { Colors } from 'themes'

export const Container = styled.div`
  border: 1px solid ${Colors.alto};
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Name = styled.div`
  cursor: pointer;
`

export const TrashIcon = styled(Trash)`
  color: ${Colors.ecstasy};
  cursor: pointer;
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

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`

export const StatusSelect = styled(Select)`
  width: 150px;
  &.field:not(:last-child) {
    margin-bottom: 0;
    cursor: pointer;
  }
`
