import styled from 'styled-components'
import { Delete } from 'styled-icons/material/Delete'

import { Colors } from 'themes'

export const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Container = styled.div``

export const AuhtorContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export const DeleteContainer = styled.div`
  color: ${Colors.black};
  display: flex;
  align-items: center;
  justify-conent: center;
`
export const Author = styled.div`
  color: ${Colors.black};
  display: flex;
  align-items: center;
  justify-conent: center;
  width: 100%;
`

export const DeleteIcon = styled(Delete)`
  color: red;
  cursor: pointer;
`

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

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`
export const SelectName = styled.div`
  margin-right: 8px;
`
