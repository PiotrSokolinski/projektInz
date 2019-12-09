/* eslint-disable */

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import dayjs from 'dayjs'
import { FormattedMessage } from 'react-intl'

import Modal from 'components/Modal'
import NewEvent from 'containers/NewEvent'
import EditEvent from 'containers/EditEvent'

import * as Utils from './Utils'
import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'
import ScaleColumn from './ScaleColumn'
import Event from './Event'
import { EVENT_SPACING, CELL_HEIGHT, NUMBER_OF_DAYS } from './constants'
import {
  StyledWeekCalendar,
  StyledWeekCalendarOverlay,
  StyledWeekCalendarOverlayStatusSelection,
  StyledWeekCalendarScaleHeader,
  StyledWeekCalendarHeader,
  StyledWeekCalendarScaleColumn,
  StyledWeekCalendarContent,
} from './styled'
import messages from './messages'

// export const WeekCalendar2 = ({
//   firstDay,
//   selectedIntervals,
//   onIntervalSelect,
//   onIntervalUpdate,
//   onIntervalRemove,
//   onEventClick,
// }) => {
//   const scaleIntervals = Utils.getIntervalsByDuration()
//   //   const [scaleIntervals, setScaleIntervals] = useState(scaledIntervals)
//   const [columnDimensions, setColumnDimensions] = useState([])
//   const [scrollPosition, setScrollPosition] = useState({
//     top: 0,
//     left: 0,
//   })
//   const [mousePosition, setMousePosition] = useState({
//     x: 0,
//     y: 0,
//   })
//   const [startSelectionPosition, setStartSelectionPosition] = useState(null)
//   const [preselectedInterval, setPreselectedInterval] = useState(null)

//   useEffect(() => {
//     calculateColumnDimension()
//     window.addEventListener('resize', calculateColumnDimension, false)
//     window.addEventListener('mouseup', handleSelectionStop, false)

//     return () => {
//       window.removeEventListener('resize', calculateColumnDimension, false)
//       window.removeEventListener('mouseup', handleSelectionStop, false)
//     }
//   }, [])

//   const calculateColumnDimension = () => {
//     const newColumnDimensions = []
//     for (let i = 0; i < NUMBER_OF_DAYS; i += 1) {
//       const left = i === 0 ? 0 : newColumnDimensions[i - 1].left + newColumnDimensions[i - 1].width
//       let columnWidth = 0

//       const columnElement = document.querySelectorAll(`[data-colpos='${i}']`)[0]
//       if (columnElement) {
//         columnWidth = columnElement.getBoundingClientRect().width
//       }
//       newColumnDimensions.push({
//         left,
//         width: columnWidth,
//       })
//     }
//     //this.setState({ columnDimensions })
//     setColumnDimensions(newColumnDimensions)
//   }

//   const handleScroll = e => {
//     const { scrollTop, scrollLeft } = e.target
//     setScrollPosition({ top: scrollTop, left: scrollLeft })
//     // this.setState({
//     //   scrollPosition: {
//     //     top: e.target.scrollTop,
//     //     left: e.target.scrollLeft,
//     //   },
//     // })
//   }

//   const handleCellMouseEnter = (col, row) => {
//     console.log({ col, row })
//     if (startSelectionPosition != null) {
//       setMousePosition({
//         x: col,
//         y: row,
//       })
//       //   this.setState({
//       //     mousePosition: {
//       //       x: col,
//       //       y: row,
//       //     },
//       //   })
//     }
//   }

//   const handleSelectionStart = (col, row) => {
//     const newStartSelectionPosition = {
//       x: col,
//       y: row,
//     }
//     console.log(newStartSelectionPosition)
//     setStartSelectionPosition(newStartSelectionPosition)
//     setMousePosition(newStartSelectionPosition)
//     // this.setState({
//     //   startSelectionPosition,
//     //   mousePosition: startSelectionPosition,
//     // })
//   }
//   console.log(startSelectionPosition)
//   const handleSelectionStop = e => {
//     console.log('e.button', e.button)
//     console.log(mousePosition)
//     console.log('startSelectionPosition', startSelectionPosition)
//     if (e.button !== 0 || startSelectionPosition === null) {
//       return
//     }

//     const endCol = mousePosition.x
//     const endRow = mousePosition.y

//     const minDayIndex = Math.min(startSelectionPosition.x, endCol)
//     const maxDayIndex = Math.max(startSelectionPosition.x, endCol)
//     const startDay = dayjs(firstDay).add(minDayIndex, 'days')
//     const endDay = dayjs(firstDay).add(maxDayIndex, 'days')
//     const minCellIndex = Math.min(startSelectionPosition.y, endRow)
//     const maxCellIndex = Math.max(startSelectionPosition.y, endRow) + 1
//     const offsetTop = Utils.getOffset(scaleIntervals[0].start)
//     const startSelectionTime = Utils.getMoment(startDay, minCellIndex, offsetTop)
//     const endSelectionTime = Utils.getMoment(endDay, maxCellIndex, offsetTop)

//     const start = dayjs(startDay)
//       .hour(startSelectionTime.hour())
//       .minute(startSelectionTime.minute())
//       .second(0)
//     const end = dayjs(endDay)
//       .hour(endSelectionTime.hour())
//       .minute(endSelectionTime.minute())
//       .second(0)
//     const newPreselectedInterval = {
//       start,
//       end,
//     }
//     setPreselectedInterval(newPreselectedInterval)
//     setStartSelectionPosition(null)
//     setMousePosition(null)

//     // this.setState({
//     //   preselectedInterval,
//     //   updateEvent: false,
//     // })

//     // this.setState({
//     //   startSelectionPosition: null,
//     //   mousePosition: null,
//     // })
//   }

//   const submitPreselectedInterval = newValue => {
//     if (onIntervalSelect) {
//       const intervals = Utils.getIntervals(preselectedInterval.start, preselectedInterval.end)
//       const result = intervals.map(interval => ({
//         ...interval,
//         ...newValue,
//       }))
//       onIntervalSelect(result)
//     }
//     setPreselectedInterval(null)
//     // this.setState({ preselectedInterval: null })
//   }
//   const closeModule = () => {
//     // this.setState({
//     //   preselectedInterval: null,
//     // })
//     setPreselectedInterval(isNullOrUndefined)
//   }

//   const handleEventClick = oEvent => {
//     if (onEventClick) {
//       onEventClick(oEvent)
//     }
//     setPreselectedInterval(oEvent)
//     // this.setState({
//     //   preselectedInterval: oEvent,
//     //   updateEvent: true,
//     // })
//   }

//   const renderSelectedIntervals = () => {
//     const result = []
//     if (columnDimensions.length === 0 || selectedIntervals.length === 0) {
//       return result
//     }
//     const offsetTop = Utils.getOffset(scaleIntervals[0].start)

//     for (let dayIndex = 0; dayIndex < NUMBER_OF_DAYS; dayIndex += 1) {
//       const day = dayjs(firstDay)
//         .startOf('day')
//         .add(dayIndex, 'day')
//       const intervals = selectedIntervals.filter(
//         interval => interval.start.isSame(day, 'day') || interval.end.isSame(day, 'day'),
//       )
//       if (intervals.length > 0) {
//         intervals.sort((i1, i2) => i1.start.diff(i2.start, 'minutes'))

//         intervals.forEach((interval, index, array) => {
//           let startY = 0
//           if (!interval.start.isBefore(day)) {
//             startY = Utils.getNumberOfCells(interval.start, 60, false, offsetTop)
//           }

//           if (startY > scaleIntervals.length) {
//             return
//           }

//           const beforeIntersectionNumber = array.filter((i, i1) => i1 < index && interval.start.isBefore(i.end)).length
//           const afterIntersectionNumber = array.filter((i, i1) => i1 > index && interval.end.isAfter(i.start)).length
//           const groupIntersection = beforeIntersectionNumber + afterIntersectionNumber + 1

//           let endY = Utils.getNumberOfCells(interval.end, 60, true, offsetTop)
//           if (endY > scaleIntervals.length) {
//             endY = scaleIntervals.length
//           }
//           const top = startY * CELL_HEIGHT
//           const width = (columnDimensions[dayIndex].width - EVENT_SPACING) / groupIntersection

//           const left =
//             columnDimensions[dayIndex].left +
//             (width + Math.floor(EVENT_SPACING / groupIntersection)) * beforeIntersectionNumber
//           const height = (endY - startY) * CELL_HEIGHT
//           const eventWrapperStyle = {
//             top,
//             left,
//             width,
//             height,
//           }
//           const eventComponent = (
//             <StyledWeekCalendarOverlay
//               key={dayIndex * 20000 + index}
//               style={eventWrapperStyle}
//               onClick={() => handleEventClick(interval)}
//             >
//               <Event {...interval} />
//             </StyledWeekCalendarOverlay>
//           )
//           result.push(eventComponent)
//         })
//       }
//     }
//     return result
//   }

//   const renderOverlay = () => {
//     if (startSelectionPosition != null) {
//       const startPosition = startSelectionPosition

//       const top = Math.min(startPosition.y, mousePosition.y) * CELL_HEIGHT
//       const { left } = columnDimensions[Math.min(startPosition.x, mousePosition.x)]
//       const lastSelectedColumn = columnDimensions[Math.max(startPosition.x, mousePosition.x)]
//       const width = lastSelectedColumn.left - left + lastSelectedColumn.width
//       const height = (Math.max(startPosition.y, mousePosition.y) + 1) * CELL_HEIGHT - top
//       const overlayStyle = {
//         top,
//         left,
//         width,
//         height,
//       }
//       return <StyledWeekCalendarOverlayStatusSelection style={overlayStyle} />
//     }
//     return null
//   }

//   const renderModal = () => {
//     if (preselectedInterval) {
//       return (
//         <Modal visible title="Title" /*onClose={removePreselectedInterval} */>
//           <NewEvent {...preselectedInterval} onSave={submitPreselectedInterval} />
//         </Modal>
//       )
//     }

//     return null
//   }

//   console.log({ startSelectionPosition })
//   const isSelection = startSelectionPosition !== null
//   return (
//     <StyledWeekCalendar isSelection={isSelection}>
//       <StyledWeekCalendarScaleHeader>
//         <FormattedMessage {...messages.time} />
//       </StyledWeekCalendarScaleHeader>
//       <StyledWeekCalendarHeader style={{ left: -scrollPosition.left }}>
//         <CalendarHeader firstDay={firstDay} columnDimensions={columnDimensions} />
//       </StyledWeekCalendarHeader>
//       <StyledWeekCalendarScaleColumn style={{ top: -scrollPosition.top }}>
//         <ScaleColumn scaleIntervals={scaleIntervals} />
//       </StyledWeekCalendarScaleColumn>
//       <StyledWeekCalendarContent onScroll={handleScroll}>
//         <CalendarBody
//           firstDay={firstDay}
//           scaleIntervals={scaleIntervals}
//           onSelectionStart={handleSelectionStart}
//           onCellMouseEnter={handleCellMouseEnter}
//         />
//         {renderSelectedIntervals()}
//         {renderOverlay()}
//       </StyledWeekCalendarContent>
//       {renderModal()}
//     </StyledWeekCalendar>
//   )
// }

class WeekCalendar extends React.Component {
  constructor(props) {
    super(props)
    const scaleIntervals = Utils.getIntervalsByDuration()

    this.state = {
      scaleIntervals,
      columnDimensions: [],
      scrollPosition: {
        top: 0,
        left: 0,
      },
      startSelectionPosition: null,
      preselectedInterval: null,
    }
  }

  componentDidMount() {
    this.calculateColumnDimension()
    window.addEventListener('resize', this.calculateColumnDimension)
    window.addEventListener('mouseup', this.handleSelectionStop)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateColumnDimension)
    window.removeEventListener('mouseup', this.handleSelectionStop)
  }

  calculateColumnDimension = () => {
    const columnDimensions = []
    for (let i = 0; i < NUMBER_OF_DAYS; i += 1) {
      const left = i === 0 ? 0 : columnDimensions[i - 1].left + columnDimensions[i - 1].width
      let columnWidth = 0

      const columnElement = document.querySelectorAll(`[data-colpos='${i}']`)[0]
      if (columnElement) {
        columnWidth = columnElement.getBoundingClientRect().width
      }
      columnDimensions.push({
        left,
        width: columnWidth,
      })
    }
    this.setState({ columnDimensions })
  }

  handleScroll = e => {
    this.setState({
      scrollPosition: {
        top: e.target.scrollTop,
        left: e.target.scrollLeft,
      },
    })
  }

  handleCellMouseEnter = (col, row) => {
    if (this.state.startSelectionPosition != null) {
      this.setState({
        mousePosition: {
          x: col,
          y: row,
        },
      })
    }
  }

  handleSelectionStart = (col, row) => {
    const startSelectionPosition = {
      x: col,
      y: row,
    }
    this.setState({
      startSelectionPosition,
      mousePosition: startSelectionPosition,
    })
  }

  handleSelectionStop = e => {
    if (e.button !== 0) {
      return
    }

    const { firstDay } = this.props
    const { startSelectionPosition, mousePosition, scaleIntervals } = this.state
    if (startSelectionPosition == null) {
      return
    }

    const endCol = mousePosition.x
    const endRow = mousePosition.y

    const minDayIndex = Math.min(startSelectionPosition.x, endCol)
    const maxDayIndex = Math.max(startSelectionPosition.x, endCol)
    const startDay = dayjs(firstDay).add(minDayIndex, 'days')
    const endDay = dayjs(firstDay).add(maxDayIndex, 'days')
    const minCellIndex = Math.min(startSelectionPosition.y, endRow)
    const maxCellIndex = Math.max(startSelectionPosition.y, endRow) + 1
    const offsetTop = Utils.getOffset(scaleIntervals[0].start)
    const startSelectionTime = Utils.getMoment(startDay, minCellIndex, offsetTop)
    const endSelectionTime = Utils.getMoment(endDay, maxCellIndex, offsetTop)

    const start = dayjs(startDay)
      .hour(startSelectionTime.hour())
      .minute(startSelectionTime.minute())
      .second(0)
    const end = dayjs(endDay)
      .hour(endSelectionTime.hour())
      .minute(endSelectionTime.minute())
      .second(0)
    const preselectedInterval = {
      start,
      end,
    }
    this.setState({
      preselectedInterval,
      updateEvent: false,
    })

    this.setState({
      startSelectionPosition: null,
      mousePosition: null,
    })
  }

  removePreselectedInterval = () => {
    const { preselectedInterval, updateEvent } = this.state
    if (updateEvent && this.props.onIntervalRemove) {
      this.props.onIntervalRemove(preselectedInterval)
    }
    this.setState({ preselectedInterval: null })
  }

  submitPreselectedInterval = newValue => {
    const { preselectedInterval /*, updateEvent */ } = this.state
    // if (updateEvent) {
    //   if (this.props.onIntervalUpdate) {
    //     this.props.onIntervalUpdate({
    //       ...preselectedInterval,
    //       ...newValue,
    //     })
    //   }
    // } else
    if (this.props.onIntervalSelect) {
      const intervals = Utils.getIntervals(preselectedInterval.start, preselectedInterval.end)
      const result = intervals.map(interval => ({
        ...interval,
        ...newValue,
      }))
      this.props.onIntervalSelect(result)
    }

    this.setState({ preselectedInterval: null })
  }

  closeModule = () => {
    this.setState({
      preselectedInterval: null,
    })
  }

  handleEventClick = oEvent => {
    if (this.props.onEventClick) {
      this.props.onEventClick(oEvent)
    }
    this.setState({
      preselectedInterval: oEvent,
      updateEvent: true,
    })
  }

  renderSelectedIntervals() {
    const { firstDay, selectedIntervals } = this.props
    const { columnDimensions, scaleIntervals } = this.state
    const result = []
    if (columnDimensions.length === 0 || selectedIntervals.length === 0) {
      return result
    }
    const offsetTop = Utils.getOffset(scaleIntervals[0].start)

    for (let dayIndex = 0; dayIndex < NUMBER_OF_DAYS; dayIndex += 1) {
      const day = dayjs(firstDay)
        .startOf('day')
        .add(dayIndex, 'day')
      const intervals = selectedIntervals.filter(
        interval => interval.start.isSame(day, 'day') || interval.end.isSame(day, 'day'),
      )
      if (intervals.length > 0) {
        intervals.sort((i1, i2) => i1.start.diff(i2.start, 'minutes'))

        intervals.forEach((interval, index, array) => {
          let startY = 0
          if (!interval.start.isBefore(day)) {
            startY = Utils.getNumberOfCells(interval.start, 60, false, offsetTop)
          }

          if (startY > scaleIntervals.length) {
            return
          }

          const beforeIntersectionNumber = array.filter((i, i1) => i1 < index && interval.start.isBefore(i.end)).length
          const afterIntersectionNumber = array.filter((i, i1) => i1 > index && interval.end.isAfter(i.start)).length
          const groupIntersection = beforeIntersectionNumber + afterIntersectionNumber + 1

          let endY = Utils.getNumberOfCells(interval.end, 60, true, offsetTop)
          if (endY > scaleIntervals.length) {
            endY = scaleIntervals.length
          }
          const top = startY * CELL_HEIGHT
          const width = (columnDimensions[dayIndex].width - EVENT_SPACING) / groupIntersection

          const left =
            columnDimensions[dayIndex].left +
            (width + Math.floor(EVENT_SPACING / groupIntersection)) * beforeIntersectionNumber
          const height = (endY - startY) * CELL_HEIGHT
          const eventWrapperStyle = {
            top,
            left,
            width,
            height,
          }
          const eventComponent = (
            <StyledWeekCalendarOverlay
              key={dayIndex * 20000 + index}
              style={eventWrapperStyle}
              onClick={() => this.handleEventClick(interval)}
            >
              <Event {...interval} color={get(interval, 'author.color', null)} />
            </StyledWeekCalendarOverlay>
          )
          result.push(eventComponent)
        })
      }
    }
    return result
  }

  renderOverlay() {
    if (this.state.startSelectionPosition != null) {
      const startPosition = this.state.startSelectionPosition
      const { mousePosition } = this.state

      const top = Math.min(startPosition.y, mousePosition.y) * CELL_HEIGHT
      const { left } = this.state.columnDimensions[Math.min(startPosition.x, mousePosition.x)]
      const lastSelectedColumn = this.state.columnDimensions[Math.max(startPosition.x, mousePosition.x)]
      const width = lastSelectedColumn.left - left + lastSelectedColumn.width
      const height = (Math.max(startPosition.y, mousePosition.y) + 1) * CELL_HEIGHT - top
      const overlayStyle = {
        top,
        left,
        width,
        height,
      }
      return <StyledWeekCalendarOverlayStatusSelection style={overlayStyle} />
    }
    return null
  }

  renderModal() {
    const { preselectedInterval, updateEvent } = this.state
    const { groupMembers } = this.props
    const shouldRenderCreateModal = preselectedInterval && !updateEvent
    const shouldRenderEditModal = updateEvent
    if (shouldRenderCreateModal) {
      return (
        <Modal visible title="Create event" onClose={this.removePreselectedInterval}>
          <NewEvent
            {...preselectedInterval}
            onSave={this.submitPreselectedInterval}
            groupMembers={groupMembers}
            fromCalendar
            refetch={this.props.refetch}
          />
        </Modal>
      )
    }
    if (shouldRenderEditModal) {
      return (
        <Modal
          visible
          title="Edit event"
          onClose={() => this.setState({ updateEvent: false, preselectedInterval: null })}
        >
          <EditEvent
            refetch={this.props.refetch}
            eventId={preselectedInterval.id}
            groupMembers={groupMembers}
            onClose={() => this.setState({ updateEvent: false, preselectedInterval: null })}
          />
        </Modal>
      )
    }

    return null
  }

  render() {
    const { firstDay } = this.props

    const isSelection = this.state.startSelectionPosition != null
    return (
      <StyledWeekCalendar isSelection={isSelection}>
        <StyledWeekCalendarScaleHeader>
          <FormattedMessage {...messages.time} />
        </StyledWeekCalendarScaleHeader>
        <StyledWeekCalendarHeader style={{ left: -this.state.scrollPosition.left }}>
          <CalendarHeader firstDay={firstDay} columnDimensions={this.state.columnDimensions} />
        </StyledWeekCalendarHeader>
        <StyledWeekCalendarScaleColumn style={{ top: -this.state.scrollPosition.top }}>
          <ScaleColumn scaleIntervals={this.state.scaleIntervals} />
        </StyledWeekCalendarScaleColumn>
        <StyledWeekCalendarContent onScroll={this.handleScroll}>
          <CalendarBody
            firstDay={firstDay}
            scaleIntervals={this.state.scaleIntervals}
            onSelectionStart={this.handleSelectionStart}
            onCellMouseEnter={this.handleCellMouseEnter}
          />
          {this.renderSelectedIntervals()}
          {this.renderOverlay()}
        </StyledWeekCalendarContent>
        {this.renderModal()}
      </StyledWeekCalendar>
    )
  }
}

WeekCalendar.propTypes = {
  firstDay: PropTypes.object,
  selectedIntervals: PropTypes.array,
  onIntervalSelect: PropTypes.func.isRequired,
  onIntervalUpdate: PropTypes.func.isRequired,
  onIntervalRemove: PropTypes.func.isRequired,
}

WeekCalendar.defaultProps = {
  firstDay: dayjs()
    .startOf('week')
    .startOf('day'),
  selectedIntervals: [],
}

export default WeekCalendar
