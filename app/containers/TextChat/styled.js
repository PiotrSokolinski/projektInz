import styled from 'styled-components'
import Textarea from 'react-textarea-autosize'
import { Attachment } from 'styled-icons/icomoon/Attachment'
import Button from 'components/Button'
import { Colors } from 'themes'

export const AttachmentIcon = styled(Attachment)`
  color: ${Colors.ecstasy};
  margin: 0 15px;
  cursor: pointer;
`

export const SendButton = styled(Button)`
  width: 100px;
  height: 30px;
`

export const Container = styled.div`
  border: 1px solid ${Colors.edward};
  margin-top: 20px;
  width: 45vw;
  display: flex;
  flex-direction: column;
`
export const TextChatHeader = styled.div`
  background: ${Colors.concrete};
  border-bottom: 1px solid ${Colors.edward};
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0 25px;
`

export const Header = styled.div`
  font-size: 18px;
`

export const TextChatFooter = styled.div`
  background: ${Colors.concrete};
  border-top: 1px solid ${Colors.edward};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  flex: 1;
`

export const TextChatBody = styled.div`
  flex: 12;
  overflow: auto;
`

export const AvatarContainer = styled.div`
  display: flex;
  & > div {
    margin: 0 1px;
  }
`

export const TextArea = styled(Textarea)`
  background: ${Colors.white};
  border-radius: 100px;
  border: 1px solid ${Colors.edward};
  font-size: 13px;
  padding: 10px 20px;
  resize: none;
  width: 100%;
  outline: none;
`

export const DayInformation = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  color: ${Colors.ecstasy};
  margin-top: 5px;
`
