import styled from 'styled-components'
import { Columns as BulmaColumns } from 'react-bulma-components/lib'

import { Colors } from 'themes/index'

export const Columns = styled(BulmaColumns)``

export const Column = styled(BulmaColumns.Column)``

export const LandingLeftSection = styled.div`
  background: white;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`
export const RightColumn = styled(BulmaColumns.Column)`
  background: blue;
`

export const Container = styled.div`
  background: #b3d9ff;
  display: flex;
  height: 100vh;
  justify-content: center;
  overflow: auto;
  box-sizing: border-box;
  border-left: 100px solid white;
  border-bottom: 100px solid transparent;
  border-top: 100px solid transparent;
`
export const Image = styled.img``
