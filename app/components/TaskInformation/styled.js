import styled from 'styled-components'

import { Colors } from 'themes'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const DescriptionContainer = styled.div``

export const Description = styled.div`
  font-size: 13px;
  color: ${Colors.black};
`

export const DescriptionTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: ${Colors.black};
  margin-bottom: 5px;
`

export const AuthorContainer = styled.div`
  color: ${Colors.black};
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  margin-top: 15px;
`

export const Author = styled.div`
  color: ${Colors.black};
`
