import styled from 'styled-components'
import { Circle } from 'styled-icons/boxicons-solid/Circle'

import Select from 'components/Select'
import Button from 'components/Button'
import { Colors } from 'themes'

export const CircileIcon = styled(Circle)`
  color: ${props => props.color};
  margin-right: 15px;
`

export const SaveChangesButton = styled(Button)`
  width: 250px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const GroupDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

export const MembersNamesList = styled.div`
  display: flex;
  flex-direction: column;
`

export const UserContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
`

export const User = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
`

export const UserSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`
export const ChangableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
`

export const NameContainer = styled.div`
  font-size: 17px;
  margin-right: 15px;
  ${props => props.highlight && 'font-weight: bold'};
`

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`
export const RoleSelect = styled(Select)`
  width: 200px;
  &.field:not(:last-child) {
    margin-bottom: 25px;
    cursor: pointer;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`

export const LeaveButton = styled.button`
  background: none;
  border: 1px solid ${Colors.red};
  border-radius: 100px;
  height: 40px;
  width: 210px;
  outline: none;
  color: ${Colors.red};
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 0.02em;
  line-height: 19px;
  margin-top: 18px;
  &:hover {
    background: ${Colors.red};
    color: ${Colors.white};
  }
`

export const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  border-right: 1px solid ${Colors.edward};
  margin-right: 30px;
`
