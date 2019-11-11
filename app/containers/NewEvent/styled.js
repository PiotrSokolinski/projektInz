import styled from 'styled-components'

import { Colors } from 'themes'

export const Container = styled.div``

export const Date = styled.div`
  color: ${Colors.black};
  text-align: center;
`

export const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  & > div {
    margin-left: 15px;
  }
  & > div:first-of-type {
    margin-left: 0;
  }
`
