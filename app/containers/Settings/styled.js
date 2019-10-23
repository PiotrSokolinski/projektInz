import styled from 'styled-components'

import Input from 'components/Input'
import Button from 'components/Button'
import { Colors } from 'themes'

export const EditPhotoButton = styled(Button)`
  margin-left: 25px;
`

export const EditButton = styled(Button)`
  width: 120px;
  height: 30px;
`

export const ChangeButton = styled(Button)`
  width: 200px;
  height: 50px;
`

export const Container = styled.div`
  display: flex;
  height: calc(100vh - 75px);
`

export const ContentWrapper = styled.div`
  margin: 30px;
  width: 100%;
  background: ${Colors.concrete};
  border-radius: 5px;
`

export const Header = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin: 25px;
  text-align: center;
`

export const PhotoWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const InformationWrapper = styled.div`
  display: flex;
  margin: 30px;
`

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputsWrapper = styled.div`
  margin-top: 25px;
`

export const AccoutInput = styled(Input)`
  margin-top: 25px;
`

export const EmailPasswordContainer = styled.div`
  margin-top: 125px;
  display: flex;
  flex-direction: column;
`

export const ButtonsContainer = styled.div`
  margin-left: 100px;
  display: flex;
  align-items: center;
  & > div:first-of-type {
    margin-right: 50px;
  }
`

export const ChangeTitle = styled.div`
  font-size: 16px;
  margin-bottom: 25px;
`

export const ChangeContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ChangeHeader = styled.div`
  font-size: 19px;
  font-weight: bold;
  text-align: center;
  margin-left: 100px;
  margin-bottom: 25px;
`
