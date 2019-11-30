import styled from 'styled-components'

export const Container = styled.div``

export const Date = styled.div`
  font-size: 17px;
  font-weight: bold;
`

export const Time = styled.div`
  font-size: 17px;
  font-weight: bold;
`

export const DateContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export const Description = styled.div`
  margin-bottom: 15px;
`

export const Title = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
  font-weight: bold;
  ${props => props.center && 'text-align: center'};
`

export const InvitedMembersList = styled.div`
  display: flex;
  flex-direction: column;
`

export const InvitedMemberContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const FullName = styled.div`
  margin-right: 15px;
  ${props => props.isAuthor && 'font-weight: bold;'};
`
