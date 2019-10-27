import styled from 'styled-components'

import { Colors } from 'themes'

export const Container = styled.div`
  display: flex;
`

export const ToDoColumn = styled.div`
  flex: 1;
  border-right: 1px solid ${Colors.edward};
`

export const InProgressColumn = styled.div`
  flex: 1;
`

export const TitleColumn = styled.div`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid ${Colors.edward};
`
