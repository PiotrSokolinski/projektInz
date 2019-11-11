import styled from 'styled-components'

import Input from 'components/Input'
import Button from 'components/Button'
import { Colors } from 'themes'

export const EditPhotoButton = styled(Button)`
  margin-left: 25px;
`

export const EditButton = styled(Button)`
  margin-top: 15px;
  width: 120px;
  height: 30px;
`

export const ChangeButton = styled(Button)`
  width: 200px;
  height: 50px;
  margin-top: 35px;
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
  margin: 25px 25px 0;
  text-align: center;
`

export const PhotoWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${Colors.edward};
  padding: 0 30px 20px;
`

export const InformationWrapper = styled.div`
  display: flex;
  margin: 30px;
`

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  width: 300px;
`

export const AccoutInput = styled(Input)`
  margin-top: 25px;
`

export const ChangeHeader = styled.div`
  font-size: 19px;
  margin-top: 25px;
  font-weight: bold;
  text-align: center;
`

export const CredentialsContainer = styled.div`
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
