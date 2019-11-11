/* eslint-disable */

import React, { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import MyModal from 'components/Modal'
import NewEvent from 'containers/NewEvent'

import * as Utils from './Utils'
import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'
import ScaleColumn from './ScaleColumn'

import HeaderCell from './HeaderCell'
import DayCell from './DayCell'
import Event from './Event'
import Modal from './Modal'

import { ACTION_TYPES } from './constants'

import {
  StyledWeekCalendar,
  StyledWeekCalendarOverlay,
  StyledWeekCalendarOverlayStatusSelection,
  StyledWeekCalendarScaleHeader,
  StyledWeekCalendarHeader,
  StyledWeekCalendarScaleColumn,
  StyledWeekCalendarContent,
} from './styled'

const reducer = (state, action) => {
  const { type, value } = action
  switch (type) {
    case 'updateScaleIntervals':
      return {
        ...state,
        scaleIntervals: value,
      }
    case 'updateColumnDimensions':
      return {
        ...state,
        columnDimensions: value,
      }
    case 'updateScrollPosition':
      return {
        ...state,
        scrollPosition: value,
      }
    case 'updateMousePosition':
      return {
        ...state,
        mousePosition: value,
      }
    case 'updateStartSelectionPosition':
      return {
        ...state,
        startSelectionPosition: value,
      }
    case 'updatePreselectedInterval':
      return {
        ...state,
        preselectedInterval: value,
      }
    case 'updateUpdateEvent':
      return {
        ...state,
        updateEvent: value,
      }
    default:
      return state
  }
}

const WeekCalendar2 = ({
  scaleUnit,
  startTime,
  endTime,
  numberOfDays,
  firstDay,
  useModal,
  showModalCase,
  onIntervalSelect,
  onIntervalRemove,
  onIntervalUpdate,
  onEventClick,
}) => {
  const scaleIntervals = Utils.getIntervalsByDuration(scaleUnit, startTime, endTime)

  const [state, dispatch] = useReducer(reducer, {
    scaleIntervals,
    columnDimensions: [],
    scrollPosition: {
      top: 0,
      left: 0,
    },
    mousePosition: {
      top: 0,
      left: 0,
    },
    startSelectionPosition: null,
    preselectedInterval: null,
    updateEvent: false,
  })

  useEffect(() => {
    this.calculateColumnDimension()
    window.addEventListener('resize', calculateColumnDimension)
    window.addEventListener('mouseup', handleSelectionStop)
    return () => {
      window.removeEventListener('resize', calculateColumnDimension)
      window.removeEventListener('mouseup', handleSelectionStop)
    }
  }, [])

  const calculateColumnDimension = () => {
    const columnDimensions = []
    for (let i = 0; i < numberOfDays; i += 1) {
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
    dispatch({
      type: 'updateColumnDimensions',
      value: columnDimensions,
    })
  }

  const handleScroll = e => {
    dispatch({
      type: 'updateScrollPosition',
      value: {
        top: e.target.scrollTop,
        left: e.target.scrollLeft,
      },
    })
  }

  const handleCellMouseEnter = (col, row) => {
    if (state.startSelectionPosition != null) {
      dispatch({
        type: 'updateScrollPosition',
        value: {
          top: col,
          left: row,
        },
      })
    }
  }

  const handleSelectionStart = (col, row) => {
    const startSelectionPosition = {
      x: col,
      y: row,
    }
    dispatch({
      type: 'updateStartSelectionPosition',
      value: startSelectionPosition,
    })
    dispatch({
      type: 'updateScrollPosition',
      value: startSelectionPosition,
    })
  }

  const handleSelectionStop = e => {
    if (e.button !== 0) {
      return
    }

    const { startSelectionPosition, mousePosition, scaleIntervals } = state

    if (startSelectionPosition == null) {
      return
    }

    const endCol = mousePosition.x
    const endRow = mousePosition.y

    const minDayIndex = Math.min(startSelectionPosition.x, endCol)
    const maxDayIndex = Math.max(startSelectionPosition.x, endCol)

    const startDay = moment(firstDay).add(minDayIndex, 'days')
    const endDay = moment(firstDay).add(maxDayIndex, 'days')

    const minCellIndex = Math.min(startSelectionPosition.y, endRow)
    const maxCellIndex = Math.max(startSelectionPosition.y, endRow) + 1
    const offsetTop = Utils.getOffset(scaleIntervals[0].start)
    const startSelectionTime = Utils.getMoment(scaleUnit, minCellIndex, offsetTop)
    const endSelectionTime = Utils.getMoment(scaleUnit, maxCellIndex, offsetTop)

    const start = moment(startDay)
      .hour(startSelectionTime.hour())
      .minute(startSelectionTime.minute())
      .second(0)
    const end = moment(endDay)
      .hour(endSelectionTime.hour())
      .minute(endSelectionTime.minute())
      .second(0)

    if (useModal && showModalCase.includes(ACTION_TYPES.CREATE)) {
      const preselectedInterval = {
        start,
        end,
      }
      dispatch({
        type: 'updatePreselectedInterval',
        value: preselectedInterval,
      })
    } else {
      const result = Utils.getIntervals(start, end)
      if (onIntervalSelect) {
        onIntervalSelect(result)
      }
    }

    dispatch({
      type: 'updateStartSelectionPosition',
      value: null,
    })
    dispatch({
      type: 'updateMousePosition',
      value: null,
    })
  }

  const removePreselectedInterval = () => {
    const { preselectedInterval, updateEvent } = state
    if (updateEvent && onIntervalRemove) {
      onIntervalRemove(preselectedInterval)
    }
    dispatch({
      type: 'updatePreselectedInterval',
      value: null,
    })
  }

  const submitPreselectedInterval = newValue => {
    const { preselectedInterval, updateEvent } = state

    if (updateEvent) {
      if (onIntervalUpdate) {
        onIntervalUpdate({
          ...preselectedInterval,
          ...newValue,
        })
      }
    } else if (onIntervalSelect) {
      const intervals = Utils.getIntervals(preselectedInterval.start, preselectedInterval.end)
      const result = intervals.map(interval => ({
        ...interval,
        ...newValue,
      }))
      onIntervalSelect(result)
    }

    dispatch({
      type: 'updatePreselectedInterval',
      value: null,
    })
  }

  closeModule = () => {
    dispatch({
      type: 'updatePreselectedInterval',
      value: null,
    })
  }

  handleEventClick = oEvent => {
    if (onEventClick) {
      onEventClick(oEvent)
    }
    dispatch({
      type: 'updatePreselectedInterval',
      value: oEvent,
    })
    dispatch({
      type: 'updateUpdateEvent',
      value: null,
    })
  }

  // renderSelectedIntervals() {
  //   const { firstDay, numberOfDays, cellHeight, scaleUnit, selectedIntervals, eventSpacing } = this.props
  //   const { columnDimensions, scaleIntervals } = this.state
  //   const result = []
  //   if (columnDimensions.length === 0 || selectedIntervals.length === 0) {
  //     return result
  //   }
  //   const EventComponent = this.props.eventComponent
  //   const offsetTop = Utils.getOffset(scaleIntervals[0].start)

  //   for (let dayIndex = 0; dayIndex < numberOfDays; dayIndex += 1) {
  //     const day = moment(firstDay)
  //       .startOf('day')
  //       .add(dayIndex, 'day')
  //     const intervals = selectedIntervals.filter(
  //       interval => interval.start.isSame(day, 'day') || interval.end.isSame(day, 'day'),
  //     )
  //     if (intervals.length > 0) {
  //       intervals.sort((i1, i2) => i1.start.diff(i2.start, 'minutes'))

  //       intervals.forEach((interval, index, array) => {
  //         let startY = 0
  //         if (!interval.start.isBefore(day)) {
  //           startY = Utils.getNumberOfCells(interval.start, scaleUnit, false, offsetTop)
  //         }

  //         if (startY > scaleIntervals.length) {
  //           return
  //         }

  //         const beforeIntersectionNumber = array.filter((i, i1) => i1 < index && interval.start.isBefore(i.end)).length
  //         const afterIntersectionNumber = array.filter((i, i1) => i1 > index && interval.end.isAfter(i.start)).length
  //         const groupIntersection = beforeIntersectionNumber + afterIntersectionNumber + 1

  //         let endY = Utils.getNumberOfCells(interval.end, scaleUnit, true, offsetTop)
  //         if (endY > scaleIntervals.length) {
  //           endY = scaleIntervals.length
  //         }
  //         const top = startY * cellHeight
  //         const width = (columnDimensions[dayIndex].width - eventSpacing) / groupIntersection

  //         // TODO: dividing  by the GroupIntersection doesn't seem to work all that great...
  //         const left =
  //           columnDimensions[dayIndex].left +
  //           (width + Math.floor(eventSpacing / groupIntersection)) * beforeIntersectionNumber
  //         const height = (endY - startY) * cellHeight
  //         const eventWrapperStyle = {
  //           top,
  //           left,
  //           width,
  //           height,
  //         }
  //         const eventComponent = (
  //           <StyledWeekCalendarOverlay
  //             key={dayIndex * 20000 + index}
  //             style={eventWrapperStyle}
  //             onClick={this.handleEventClick.bind(this, interval)}
  //           >
  //             <EventComponent {...interval} />
  //           </StyledWeekCalendarOverlay>
  //         )
  //         result.push(eventComponent)
  //       })
  //     }
  //   }
  //   return result
  // }

  // renderOverlay() {
  //   if (this.state.startSelectionPosition != null) {
  //     const startPosition = this.state.startSelectionPosition
  //     const { mousePosition } = this.state

  //     const top = Math.min(startPosition.y, mousePosition.y) * this.props.cellHeight
  //     const { left } = this.state.columnDimensions[Math.min(startPosition.x, mousePosition.x)]
  //     const lastSelectedColumn = this.state.columnDimensions[Math.max(startPosition.x, mousePosition.x)]
  //     const width = lastSelectedColumn.left - left + lastSelectedColumn.width
  //     const height = (Math.max(startPosition.y, mousePosition.y) + 1) * this.props.cellHeight - top
  //     const overlayStyle = {
  //       top,
  //       left,
  //       width,
  //       height,
  //     }
  //     return <StyledWeekCalendarOverlayStatusSelection style={overlayStyle} />
  //   }
  //   return null
  // }

  // renderModal() {
  //   const { useModal, showModalCase } = this.props
  //   const { preselectedInterval, updateEvent } = this.state
  //   const currentCase = updateEvent ? ACTION_TYPES.EDIT : ACTION_TYPES.CREATE
  //   const shouldRenderModal = preselectedInterval && useModal && showModalCase.includes(currentCase)

  //   if (shouldRenderModal) {
  //     const ModalComponent = this.props.modalComponent
  //     return (
  //       <div className="calendarModal">
  //         <div className="calendarModal__backdrop" onClick={this.closeModule} />
  //         <div className="calendarModal__content">
  //           <ModalComponent
  //             {...preselectedInterval}
  //             onRemove={this.removePreselectedInterval}
  //             onSave={this.submitPreselectedInterval}
  //             actionType={currentCase}
  //           />
  //         </div>
  //       </div>
  //       // <MyModal visible title="Title" onClose={this.removePreselectedInterval}>
  //       //   Children
  //       // </MyModal>
  //     )
  //   }

  //   return null
  // }

  const isSelection = this.state.startSelectionPosition != null

  return (
    <StyledWeekCalendar isSelection={isSelection}>
      <StyledWeekCalendarScaleHeader>
        <span>{scaleHeaderTitle}</span>
      </StyledWeekCalendarScaleHeader>
      <StyledWeekCalendarHeader style={{ left: -this.state.scrollPosition.left }}>
        <CalendarHeader
          firstDay={firstDay}
          numberOfDays={numberOfDays}
          dayFormat={dayFormat}
          columnDimensions={this.state.columnDimensions}
          headerCellComponent={headerCellComponent}
        />
      </StyledWeekCalendarHeader>
      <StyledWeekCalendarScaleColumn style={{ top: -this.state.scrollPosition.top }}>
        <ScaleColumn
          scaleUnit={this.props.scaleUnit}
          scaleFormat={scaleFormat}
          scaleIntervals={this.state.scaleIntervals}
          cellHeight={this.props.cellHeight}
        />
      </StyledWeekCalendarScaleColumn>
      <StyledWeekCalendarContent onScroll={this.handleScroll}>
        <CalendarBody
          firstDay={firstDay}
          numberOfDays={numberOfDays}
          scaleUnit={scaleUnit}
          scaleIntervals={this.state.scaleIntervals}
          cellHeight={cellHeight}
          dayCellComponent={dayCellComponent}
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

class WeekCalendar extends React.Component {
  constructor(props) {
    super(props)
    const { scaleUnit, startTime, endTime } = props
    const scaleIntervals = Utils.getIntervalsByDuration(scaleUnit, startTime, endTime)

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

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.scaleUnit !== this.props.scaleUnit ||
      nextProps.startTime !== this.props.startTime ||
      nextProps.endTime !== this.props.endTime
    ) {
      const scaleIntervals = Utils.getIntervalsByDuration(nextProps.scaleUnit, nextProps.startTime, nextProps.endTime)
      this.setState({
        scaleIntervals,
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateColumnDimension)
    window.removeEventListener('mouseup', this.handleSelectionStop)
  }

  calculateColumnDimension = () => {
    const { numberOfDays } = this.props
    const columnDimensions = []
    for (let i = 0; i < numberOfDays; i += 1) {
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

    const { firstDay, scaleUnit, useModal, showModalCase } = this.props
    const { startSelectionPosition, mousePosition, scaleIntervals } = this.state

    if (startSelectionPosition == null) {
      return
    }

    const endCol = mousePosition.x
    const endRow = mousePosition.y

    const minDayIndex = Math.min(startSelectionPosition.x, endCol)
    const maxDayIndex = Math.max(startSelectionPosition.x, endCol)

    const startDay = moment(firstDay).add(minDayIndex, 'days')
    const endDay = moment(firstDay).add(maxDayIndex, 'days')

    const minCellIndex = Math.min(startSelectionPosition.y, endRow)
    const maxCellIndex = Math.max(startSelectionPosition.y, endRow) + 1
    const offsetTop = Utils.getOffset(scaleIntervals[0].start)
    const startSelectionTime = Utils.getMoment(scaleUnit, minCellIndex, offsetTop)
    const endSelectionTime = Utils.getMoment(scaleUnit, maxCellIndex, offsetTop)

    const start = moment(startDay)
      .hour(startSelectionTime.hour())
      .minute(startSelectionTime.minute())
      .second(0)
    const end = moment(endDay)
      .hour(endSelectionTime.hour())
      .minute(endSelectionTime.minute())
      .second(0)

    if (useModal && showModalCase.includes(ACTION_TYPES.CREATE)) {
      const preselectedInterval = {
        start,
        end,
      }
      this.setState({
        preselectedInterval,
        updateEvent: false,
      })
    } else {
      const result = Utils.getIntervals(start, end)
      if (this.props.onIntervalSelect) {
        this.props.onIntervalSelect(result)
      }
    }

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
    const { preselectedInterval, updateEvent } = this.state

    if (updateEvent) {
      if (this.props.onIntervalUpdate) {
        this.props.onIntervalUpdate({
          ...preselectedInterval,
          ...newValue,
        })
      }
    } else if (this.props.onIntervalSelect) {
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
    const { firstDay, numberOfDays, cellHeight, scaleUnit, selectedIntervals, eventSpacing } = this.props
    const { columnDimensions, scaleIntervals } = this.state
    const result = []
    if (columnDimensions.length === 0 || selectedIntervals.length === 0) {
      return result
    }
    const EventComponent = this.props.eventComponent
    const offsetTop = Utils.getOffset(scaleIntervals[0].start)

    for (let dayIndex = 0; dayIndex < numberOfDays; dayIndex += 1) {
      const day = moment(firstDay)
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
            startY = Utils.getNumberOfCells(interval.start, scaleUnit, false, offsetTop)
          }

          if (startY > scaleIntervals.length) {
            return
          }

          const beforeIntersectionNumber = array.filter((i, i1) => i1 < index && interval.start.isBefore(i.end)).length
          const afterIntersectionNumber = array.filter((i, i1) => i1 > index && interval.end.isAfter(i.start)).length
          const groupIntersection = beforeIntersectionNumber + afterIntersectionNumber + 1

          let endY = Utils.getNumberOfCells(interval.end, scaleUnit, true, offsetTop)
          if (endY > scaleIntervals.length) {
            endY = scaleIntervals.length
          }
          const top = startY * cellHeight
          const width = (columnDimensions[dayIndex].width - eventSpacing) / groupIntersection

          // TODO: dividing  by the GroupIntersection doesn't seem to work all that great...
          const left =
            columnDimensions[dayIndex].left +
            (width + Math.floor(eventSpacing / groupIntersection)) * beforeIntersectionNumber
          const height = (endY - startY) * cellHeight
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
              onClick={this.handleEventClick.bind(this, interval)}
            >
              <EventComponent {...interval} />
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

      const top = Math.min(startPosition.y, mousePosition.y) * this.props.cellHeight
      const { left } = this.state.columnDimensions[Math.min(startPosition.x, mousePosition.x)]
      const lastSelectedColumn = this.state.columnDimensions[Math.max(startPosition.x, mousePosition.x)]
      const width = lastSelectedColumn.left - left + lastSelectedColumn.width
      const height = (Math.max(startPosition.y, mousePosition.y) + 1) * this.props.cellHeight - top
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
    const { useModal, showModalCase } = this.props
    const { preselectedInterval, updateEvent } = this.state
    const currentCase = updateEvent ? ACTION_TYPES.EDIT : ACTION_TYPES.CREATE
    const shouldRenderModal = preselectedInterval && useModal && showModalCase.includes(currentCase)
    if (shouldRenderModal) {
      // const ModalComponent = this.props.modalComponent
      return (
        // <div className="calendarModal">
        //   <div className="calendarModal__backdrop" onClick={this.closeModule} />
        //   <div className="calendarModal__content">
        //     <ModalComponent
        //       {...preselectedInterval}
        //       onRemove={this.removePreselectedInterval}
        //       onSave={this.submitPreselectedInterval}
        //       actionType={currentCase}
        //     />
        //   </div>
        // </div>
        <MyModal visible title="Title" onClose={this.removePreselectedInterval}>
          <NewEvent {...preselectedInterval} onSave={this.submitPreselectedInterval} />
        </MyModal>
      )
    }

    return null
  }

  render() {
    const {
      firstDay,
      numberOfDays,
      headerCellComponent,
      dayFormat,
      scaleUnit,
      scaleFormat,
      cellHeight,
      dayCellComponent,
      scaleHeaderTitle,
    } = this.props

    const isSelection = this.state.startSelectionPosition != null
    return (
      <StyledWeekCalendar isSelection={isSelection}>
        <StyledWeekCalendarScaleHeader>
          <span>{scaleHeaderTitle}</span>
        </StyledWeekCalendarScaleHeader>
        <StyledWeekCalendarHeader style={{ left: -this.state.scrollPosition.left }}>
          <CalendarHeader
            firstDay={firstDay}
            numberOfDays={numberOfDays}
            dayFormat={dayFormat}
            columnDimensions={this.state.columnDimensions}
            headerCellComponent={headerCellComponent}
          />
        </StyledWeekCalendarHeader>
        <StyledWeekCalendarScaleColumn style={{ top: -this.state.scrollPosition.top }}>
          <ScaleColumn
            scaleUnit={this.props.scaleUnit}
            scaleFormat={scaleFormat}
            scaleIntervals={this.state.scaleIntervals}
            cellHeight={this.props.cellHeight}
          />
        </StyledWeekCalendarScaleColumn>
        <StyledWeekCalendarContent onScroll={this.handleScroll}>
          <CalendarBody
            firstDay={firstDay}
            numberOfDays={numberOfDays}
            scaleUnit={scaleUnit}
            scaleIntervals={this.state.scaleIntervals}
            cellHeight={cellHeight}
            dayCellComponent={dayCellComponent}
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
  firstDay: PropTypes.object, // the first day in the caledar
  numberOfDays: PropTypes.number,
  scaleHeaderTitle: PropTypes.string,
  headerCellComponent: PropTypes.func,
  dayFormat: PropTypes.string, // header day format
  startTime: PropTypes.object, // the start time of the scale and calendar
  endTime: PropTypes.object, // the end time of the scale and calendar
  scaleUnit: PropTypes.number,
  scaleFormat: PropTypes.string,
  cellHeight: PropTypes.number,
  dayCellComponent: PropTypes.func,
  selectedIntervals: PropTypes.array,
  onIntervalSelect: PropTypes.func,
  onIntervalUpdate: PropTypes.func,
  onIntervalRemove: PropTypes.func,
  eventComponent: PropTypes.func,
  onEventClick: PropTypes.func,
  modalComponent: PropTypes.func,
  useModal: PropTypes.bool,
  showModalCase: PropTypes.arrayOf(PropTypes.string),
  eventSpacing: PropTypes.number,
}

WeekCalendar.defaultProps = {
  firstDay: moment(),
  numberOfDays: 7,
  scaleHeaderTitle: '',
  headerCellComponent: HeaderCell,
  dayFormat: 'dd., DD.MM',
  startTime: moment({ h: 0, m: 0 }),
  endTime: moment({ h: 23, m: 59 }),
  scaleUnit: 15,
  scaleFormat: 'HH:mm',
  cellHeight: 25,
  dayCellComponent: DayCell,
  selectedIntervals: [],
  eventComponent: Event,
  modalComponent: Modal,
  useModal: true,
  showModalCase: [ACTION_TYPES.CREATE, ACTION_TYPES.EDIT],
  eventSpacing: 15,
}

export default WeekCalendar
