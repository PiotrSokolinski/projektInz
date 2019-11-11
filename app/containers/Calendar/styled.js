import styled from 'styled-components'
import { CalendarPlus } from 'styled-icons/boxicons-solid/CalendarPlus'
import { RightArrowCircle } from 'styled-icons/boxicons-solid/RightArrowCircle'
import { LeftArrowCircle } from 'styled-icons/boxicons-solid/LeftArrowCircle'
import { Calendar } from 'styled-icons/icomoon/Calendar'
import { Users } from 'styled-icons/fa-solid/Users'

import { Colors } from 'themes'

export const UsersIcon = styled(Users)`
  color: ${Colors.ecstasy};
  cursor: pointer;
`

export const Container = styled.div`
  height: calc(100vh - 75px);
  padding-top: 20px;
  display: flex;
  .react-calendar {
    width: auto;
  }
`

export const CalendarContainer = styled.div`
  border-right: 1px solid ${Colors.edward};
  display: flex;
  width: 95%;
`

export const CalendarDay = styled.div`
  border-left: 1px solid ${Colors.edward};
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const DayName = styled.div`
  border-bottom: 5px solid ${Colors.ecstasy};
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 0;
`
export const CalendarHour = styled.div`
  border-bottom: 1px solid ${Colors.edward};
  width: 100%;
  flex: 1;
  font-size: 11px;
  color: ${props => (props.selected ? Colors.ecstasy : Colors.black)};
  padding-left: 2px;
  cursor: pointer;
  ${props => props.selected && `background: ${Colors.alto};`}
`

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: -40px;
`

export const Action = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const AddEvent = styled(CalendarPlus)`
  color: ${Colors.ecstasy};
  cursor: pointer;
`

const ICONS_COMMONS = `
  cursor: pointer;
  margin-top: 2px;
  color: ${Colors.anakiwa};
`

export const LeftArrow = styled(LeftArrowCircle)`
  ${ICONS_COMMONS};
`

export const RightArrow = styled(RightArrowCircle)`
  ${ICONS_COMMONS};
`

export const CalendarOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const ChangeDate = styled(Calendar)`
  cursor: pointer;
  color: ${Colors.ecstasy};
`

export const ActionTitle = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
  color: ${Colors.black};
`
