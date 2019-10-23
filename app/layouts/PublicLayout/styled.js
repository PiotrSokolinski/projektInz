import styled from 'styled-components'
import { Columns as BulmaColumns } from 'react-bulma-components/lib'
import { Colors } from 'themes'

export const Columns = styled(BulmaColumns)``

export const Column = styled(BulmaColumns.Column)``

export const LandingLeftSection = styled.div`
  background: ${Colors.white};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`

export const Container = styled.div`
  background: ${Colors.mountbattenPink};
  display: flex;
  height: 100vh;
  justify-content: center;
  overflow: auto;
  box-sizing: border-box;
  border-left: 75px solid white;
  border-bottom: 75px solid transparent;
  border-top: 75px solid transparent;
`
export const Image = styled.img``
