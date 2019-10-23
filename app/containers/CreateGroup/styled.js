import styled from 'styled-components'

import Button from 'components/Button'
import { Colors } from 'themes'

export const Container = styled.div`
  border-radius: 5px;
  align-items: center;
  background: ${Colors.white};
  border: 1px solid ${Colors.edward};
  display: flex;
  flex-direction: column;
  max-width: 567px;
  padding: 20px;
  position: relative;
`
export const UploadAvatar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const InputsContainer = styled.div``

export const UploadButton = styled(Button)`
  margin-left: 30px;
`
export const SubmitButton = styled(Button)`
  margin-top: 30px;
`

export const AddressWrapper = styled.div`
  display: flex;
`

export const AddressInputContainer = styled.div`
  flex: 3;
`

export const ApartmentNumberInput = styled.div`
  flex: 1;
  margin-left: 10px;
`

export const CodeAndCityContainer = styled.div`
  display: flex;
`

export const CityInputContainer = styled.div`
  flex: 2;
  margin-left: 10px;
`

export const ZipCodeContainer = styled.div`
  flex: 1;
`
