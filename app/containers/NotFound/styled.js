import styled from 'styled-components'

import Button from 'components/Button'
import { Colors } from 'themes'

export const GoBackButton = styled(Button)`
  background: ${Colors.ecstasy};
`

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Error404 = styled.div`
  font-size: 300px;
  font-weight: bold;
  color: ${Colors.cerulean};
`

export const Description = styled.div`
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0.02em;
  color: ${Colors.black};
  margin-top: -70px;
`

export const Information = styled.div`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0.02em;
  margin-bottom: 60px;
`
