import styled from 'styled-components'

export const StyledDayCell = styled.div`
  width: 100%;
  height: 100%;
  user-select: none;
  &:hover {
    cursor: pointer;
    background-color: rgba(249, 105, 14, 0.4);
    border-color: #f9690e;
  }
`

export const StyledCalendarBody = styled.div`
  position: relative;
  display: table;
  table-layout: fixed;
  min-width: 100%;
`

export const StyledCalendarBodyRow = styled.div`
  display: table-row;
`

export const StyledWeekCalendarHeaderColumn = styled.div`
  height: 100%;
  display: inline-block;
  border-right: 1px solid #b7b7b7;
`

export const StyledWeekCalendarHeaderWrapper = styled.div`
  height: 100%;
  border-top: 1px solid #b7b7b7;
  border-bottom: 1px solid #b7b7b7;
  background-color: #f7f7f7;
  color: #6b6b6b;
`

export const StyledCalendarBodyCell = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #b7b7b7;
`

export const StyledCalendarBodyColumn = styled.div`
  display: table-cell;
  border-right: 1px solid #b7b7b7;
  min-width: 100px;
`

export const StyledEvent = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  color: #6b6b6b;
  background-color: rgba(139, 195, 74, 0.4);
`
export const StyledTitle = styled.span``

export const StyledWeekCalendarScaleCell = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #b7b7b7;
`

export const StyledWeekCalendarOverlayStatusSelection = styled.div`
  position: absolute;
  background-color: rgba(249, 105, 14, 0.2);
`

export const StyledWeekCalendarOverlay = styled.div`
  position: absolute;
`

export const StyledWeekCalendar = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 75px);
  overflow: auto;
  padding-left: 100px;
  padding-top: 30px;
  color: #6b6b6b;
  ${props =>
    props.isSelection &&
    `${StyledWeekCalendarOverlay} {
        position: absolute; background-color: rgba(249, 105, 14, 0.2);
      }
   `}
  * > {
    box-sizing: border-box;
  }
`

export const StyledWeekCalendarScaleHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 15;
  width: 100px;
  height: 30px;
  background-color: #f7f7f7;
  border: 1px solid #b7b7b7;
  line-height: 30px;
  color: #6b6b6b;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`

export const StyledWeekCalendarHeader = styled.div`
  position: absolute;
  height: 30px;
  line-height: 30px;
  z-index: 10;
  top: 0;
  padding-left: 100px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`

export const StyledWeekCalendarScaleColumn = styled.div`
  position: absolute;
  z-index: 9;
  left: 0;
  padding-top: 30px;
  width: 100px;
  border-right: 1px solid #b7b7b7;
  border-left: 1px solid #b7b7b7;
  text-align: center;
`

export const StyledWeekCalendarContent = styled.div`
  position: relative;
  width: auto;
  overflow: auto;
`
