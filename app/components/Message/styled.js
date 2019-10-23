import styled from 'styled-components'
import { Colors } from 'themes'
export const Container = styled.div`
  display: flex;
  margin: 15px 5px;
  flex-direction: ${props => (props.isOwner ? 'row-reverse' : 'row')};
  align-items: flex-end;
`

export const MessageCloud = styled.div`
  background-color: ${props => (props.isOwner ? Colors.anakiwa : Colors.athensGrayLight)};
  max-width: 75%;
  border-radius: 10px;
  padding: 10px;
  margin: 0 5px;
  overflow-wrap: break-word;
  ${props => (props.isOwner ? 'border-bottom-right-radius: 0;' : 'border-bottom-left-radius: 0;')}
`
export const MessageTime = styled.div`
  font-size: 13px;
`
