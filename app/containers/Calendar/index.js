// /**
//  *
//  * Calendar
//  *
//  */

// import React, { useState } from 'react'
// // import PropTypes from 'prop-types'
// import ReactCalendar from 'react-calendar'
// import dayjs from 'dayjs'
// import 'dayjs/locale/en-gb'
// import times from 'lodash/times'
// import findIndex from 'lodash/findIndex'
// import minBy from 'lodash/minBy'
// import maxBy from 'lodash/maxBy'
// import isMatch from 'lodash/isMatch'
// import isEmpty from 'lodash/isEmpty'
// import some from 'lodash/some'
// import { FormattedMessage } from 'react-intl'

// import Modal from 'components/Modal'
// import NewEvent from 'containers/NewEvent'

// import messages from './messages'
// import * as Styled from './styled'
// dayjs.locale('en-gb')

// // const mockEvents = [
// //   {
// //     arranger: {
// //       firstName: 'Bob',
// //       lastName: 'Doe',
// //       avatarUrl: '',
// //     },
// //     from: '2019-10-22T10:00:00.000Z',
// //     to: '2019-10-22T13:00:00.000Z',
// //     eventName: 'Name1',
// //     description: 'description',
// //   },
// //   {
// //     arranger: {
// //       firstName: 'Bob',
// //       lastName: 'Doe',
// //       avatarUrl: '',
// //     },
// //     from: '2019-10-23T11:00:00.000Z',
// //     to: '2019-10-23T15:00:00.000Z',
// //     eventName: 'Name1',
// //     description: 'description',
// //   },
// // ]

// const dayNames = [
//   <FormattedMessage {...messages.monday} />,
//   <FormattedMessage {...messages.tuesday} />,
//   <FormattedMessage {...messages.wednesday} />,
//   <FormattedMessage {...messages.thursday} />,
//   <FormattedMessage {...messages.friday} />,
//   <FormattedMessage {...messages.saturday} />,
//   <FormattedMessage {...messages.sunday} />,
// ]
// const DAYS_NUMBER = 7
// const HOURS_NUMBER = 24

// const Calendar = () => {
//   const [selected, setSelected] = useState([])
//   const [modalEventVisible, setModalEventVisible] = useState(false)
//   const [modalCalendarVisible, setModalCalendarVisible] = useState(false)
//   const [weekFirstDay, setFirstDay] = useState(
//     dayjs()
//       .startOf('week')
//       .startOf('day'),
//   )
//   // const [weekLastDay, setLastDay] = useState(
//   //   dayjs()
//   //     .endOf('week')
//   //     .endOf('day'),
//   // )
//   const removeHour = (array, value) => array.filter(element => !isMatch(element, value))

//   const onHourClick = (indexDay, indexHour) => {
//     if (
//       !isSelected(indexDay, indexHour) &&
//       ((isTheSameDay(indexDay) && isNextOrPreviousHour(indexHour)) || isEmpty(selected))
//     )
//       setSelected([...selected, { indexDay, indexHour }])
//     else setSelected(removeHour(selected, { indexDay, indexHour }))
//   }
//   const isSelected = (indexDay, indexHour) =>
//     findIndex(selected, object => isMatch(object, { indexDay, indexHour })) > -1

//   const isTheSameDay = indexDay => some(selected, object => object.indexDay === indexDay)

//   const isNextOrPreviousHour = indexHour =>
//     some(selected, object => object.indexHour === indexHour + 1 || object.indexHour === indexHour - 1)

//   const setModalEventOpen = () => setModalEventVisible(true)
//   const setModalEventClose = () => setModalEventVisible(false)
//   const setModalCalendarOpen = () => setModalCalendarVisible(true)
//   const setModalCalendarClose = () => setModalCalendarVisible(false)
//   const setNextWeek = () => {
//     setSelected([])
//     setFirstDay(dayjs(weekFirstDay).add(DAYS_NUMBER, 'days'))
//   }
//   const setPreviousWeek = () => {
//     setSelected([])
//     setFirstDay(dayjs(weekFirstDay).subtract(DAYS_NUMBER, 'days'))
//   }
//   const onCalendarChange = date => {
//     setFirstDay(
//       dayjs(date)
//         .startOf('week')
//         .startOf('day'),
//     )
//     setModalCalendarClose()
//   }

//   return (
//     <Styled.Container>
//       <Styled.LeftArrow size="30" onClick={setPreviousWeek} />
//       <Styled.CalendarContainer>
//         {times(DAYS_NUMBER, indexDay => (
//           <Styled.CalendarDay>
//             <Styled.DayName key={`el-day-in-week-${indexDay}`}>
//               {weekFirstDay.add(indexDay, 'days').format('DD.MM.YY')}
//               &nbsp;
//               {dayNames[indexDay]}
//             </Styled.DayName>
//             {times(HOURS_NUMBER, indexHour => (
//               <Styled.CalendarHour
//                 key={`el-hour-in-day-${indexDay}-${indexHour}`}
//                 onMouseDown={() => onHourClick(indexDay, indexHour)}
//                 selected={isSelected(indexDay, indexHour)}
//               >
//                 {indexHour}:00
//               </Styled.CalendarHour>
//             ))}
//           </Styled.CalendarDay>
//         ))}
//       </Styled.CalendarContainer>
// <Styled.CalendarOptionsContainer>
//   <Styled.RightArrow size="30" onClick={setNextWeek} />
//   <Styled.ActionsContainer>
//     <Styled.Action>
//       <Styled.ActionTitle>
//         <FormattedMessage {...messages.addEvent} />
//       </Styled.ActionTitle>
//       <Styled.AddEvent size="50" onClick={setModalEventOpen} />
//     </Styled.Action>
//     <Styled.Action>
//       <Styled.ActionTitle>
//         <FormattedMessage {...messages.changeDate} />
//       </Styled.ActionTitle>
//       <Styled.ChangeDate size="40" onClick={setModalCalendarOpen} />
//     </Styled.Action>
//   </Styled.ActionsContainer>
// </Styled.CalendarOptionsContainer>
//       <Modal visible={modalEventVisible} title="Add new event" onClose={setModalEventClose}>
//         <NewEvent
//           weekStart={weekFirstDay}
//           startTime={minBy(selected, 'indexHour')}
//           endTime={maxBy(selected, 'indexHour')}
//         />
//       </Modal>
//       <Modal visible={modalCalendarVisible} title="Select a date to display" onClose={setModalCalendarClose}>
//         <ReactCalendar onChange={onCalendarChange} value={new Date()} />
//       </Modal>
//     </Styled.Container>
//   )
// }
// Calendar.propTypes = {}

// export default Calendar

import React, { useState } from 'react'
import WeekCalendar from 'containers/WeekCalendar'
import { FormattedMessage } from 'react-intl'
import ReactCalendar from 'react-calendar'

import Modal from 'components/Modal'
import NewEvent from 'containers/NewEvent'

import messages from './messages'
import * as Styled from './styled'

const Calendar = () => {
  const [modalEventVisible, setModalEventVisible] = useState(false)
  const [modalCalendarVisible, setModalCalendarVisible] = useState(false)
  const [lastUid, setLastUid] = useState(1)
  const [selectedIntervals, setSelectedIntervals] = useState([])

  const setModalEventOpen = () => setModalEventVisible(true)
  const setModalEventClose = () => setModalEventVisible(false)
  const setModalCalendarOpen = () => setModalCalendarVisible(true)
  const setModalCalendarClose = () => setModalCalendarVisible(false)

  const handleEventRemove = event => {
    const index = selectedIntervals.findIndex(interval => interval.uid === event.uid)
    if (index > -1) {
      selectedIntervals.splice(index, 1)
      setSelectedIntervals(selectedIntervals)
    }
  }

  const handleEventUpdate = event => {
    const index = selectedIntervals.findIndex(interval => interval.uid === event.uid)
    if (index > -1) {
      selectedIntervals[index] = event
      setSelectedIntervals(selectedIntervals)
    }
  }

  const handleSelect = newIntervals => {
    const intervals = newIntervals.map((interval, index) => ({
      ...interval,
      uid: lastUid + index,
    }))
    setSelectedIntervals(selectedIntervals.concat(intervals))
    setLastUid(lastUid + newIntervals.length)
  }

  return (
    <Styled.Container>
      <WeekCalendar
        selectedIntervals={selectedIntervals}
        onIntervalSelect={handleSelect}
        onIntervalUpdate={handleEventUpdate}
        onIntervalRemove={handleEventRemove}
        scaleUnit={60}
        scaleHeaderTitle="Time"
        cellHeight={30}
      />
      <Styled.CalendarOptionsContainer>
        <Styled.ActionsContainer>
          <Styled.Action>
            <Styled.ActionTitle>
              <FormattedMessage {...messages.addEvent} />
            </Styled.ActionTitle>
            <Styled.AddEvent size="50" onClick={setModalEventOpen} />
          </Styled.Action>
          <Styled.Action>
            <Styled.ActionTitle>
              <FormattedMessage {...messages.changeDate} />
            </Styled.ActionTitle>
            <Styled.ChangeDate size="40" onClick={setModalCalendarOpen} />
          </Styled.Action>
        </Styled.ActionsContainer>
      </Styled.CalendarOptionsContainer>
      <Modal visible={modalEventVisible} title="Add new event" onClose={setModalEventClose}>
        <NewEvent />
      </Modal>
      <Modal visible={modalCalendarVisible} title="Select a date to display" onClose={setModalCalendarClose}>
        <ReactCalendar onChange={() => {}} value={new Date()} />
      </Modal>
    </Styled.Container>
  )
}

export default Calendar
