import styled from 'styled-components'

import { Eye } from 'styled-icons/octicons/Eye'

import { Colors } from 'themes'

export const EyeIcon = styled(Eye)`
  color: ${Colors.ecstasy};
  cursor: pointer;
`

export const Container = styled.div`
  border: 1px solid ${Colors.edward};
  border-radius: 5px;
  margin: 25px;
  display: flex;
  align-items: center;
  padding: 5px 15px;
  justify-content: space-between;
`

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`

export const Title = styled.div`
  font-size: 15px;
  margin-left: 25px;
`
