// /**
//  *
//  * Calendar
//  *
//  */

import React, { useState, useReducer } from 'react'
import dayjs from 'dayjs'
import get from 'lodash/get'
import head from 'lodash/head'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import intersection from 'lodash/intersection'
import map from 'lodash/map'
import 'dayjs/locale/en-gb'
import { FormattedMessage } from 'react-intl'
import ReactCalendar from 'react-calendar'
import { compose, Query } from 'react-apollo'

import WeekCalendar, { WeekCalendar2 } from 'containers/WeekCalendar'
import appLocalStorage from 'utils/localStorage'
import Modal from 'components/Modal'
import NewEvent from 'containers/NewEvent'
import CalendarUsersList from 'containers/CalendarUsersList'
import Spinner from 'components/Spinner'
import InformationBox from 'components/InformationBox'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'

import messages from './messages'
import * as Styled from './styled'
import reducer from './reducer'
import GET_EVENTS_QUERY from './getEvents.gql'

dayjs.locale('en-gb')

const DAYS_NUMBER = 7
// const initialState = []

const mapEvents = events => {
  const arrayOfEvents = []
  for (let i = 0; i < events.length; i += 1) {
    const amountOfEvents = dayjs(events[i].endDate).diff(dayjs(events[i].startDate), 'day') + 1
    if (amountOfEvents === 1) {
      const event = {
        id: events[i].id,
        start: dayjs(events[i].startDate),
        end: dayjs(events[i].endDate),
        value: events[i].name,
        invitedMembers: events[i].invitedMembers,
        author: events[i].author,
      }
      arrayOfEvents.push(event)
    } else {
      for (let j = 0; j < amountOfEvents; j += 1) {
        const event = {
          id: events[i].id,
          start: dayjs(events[i].startDate).add(j, 'days'),
          end: dayjs(events[i].endDate).subtract(amountOfEvents - j - 1, 'days'),
          value: events[i].name,
          invitedMembers: events[i].invitedMembers,
          author: events[i].author,
        }
        arrayOfEvents.push(event)
      }
    }
  }
  return arrayOfEvents
}
const Calendar = ({ data, weekFirstDay, setFirstDay, refetch }) => {
  const events = get(data, 'getEvents', [])
  const groupMembers = get(data, 'group.members', [])

  const [modalEventVisible, setModalEventVisible] = useState(false)
  const [modalCalendarVisible, setModalCalendarVisible] = useState(false)
  const [modalUsersVisible, setModalUsersVisible] = useState(false)
  const mappedEvents = mapEvents(events)
  const [selectedIntervals, setSelectedIntervals] = useState(mappedEvents)
  const [state, dispatch] = useReducer(reducer, groupMembers)

  const setModalEventOpen = () => setModalEventVisible(true)
  const setModalEventClose = () => setModalEventVisible(false)
  const setModalCalendarOpen = () => setModalCalendarVisible(true)
  const setModalCalendarClose = () => setModalCalendarVisible(false)
  const setModalUsersOpen = () => setModalUsersVisible(true)
  const setModalUsersClose = () => setModalUsersVisible(false)

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
    }))
    setSelectedIntervals(selectedIntervals.concat(intervals))
  }

  const setNextWeek = () => {
    setFirstDay(dayjs(weekFirstDay).add(DAYS_NUMBER, 'days'))
  }
  const setPreviousWeek = () => {
    setFirstDay(dayjs(weekFirstDay).subtract(DAYS_NUMBER, 'days'))
  }

  const onDateChange = date => {
    setFirstDay(
      dayjs(date)
        .startOf('week')
        .startOf('day'),
    )
    setModalCalendarClose()
  }

  const saveUsers = () => {
    const newEvents = filter(mappedEvents, event => {
      const invitedMembersIds = map(event.invitedMembers, member => member.id)
      const choosenMembersIds = map(state, member => member.id)
      return !isEmpty(intersection(invitedMembersIds, choosenMembersIds))
    })
    setSelectedIntervals(newEvents)
    setModalUsersClose()
  }

  return (
    <Styled.Container>
      <Styled.LeftArrow size="30" onClick={setPreviousWeek} />
      <WeekCalendar
        firstDay={dayjs(weekFirstDay)}
        selectedIntervals={selectedIntervals}
        onIntervalSelect={handleSelect}
        onIntervalUpdate={handleEventUpdate}
        onIntervalRemove={handleEventRemove}
        // onEventClick={() => alert('eee')}
        refetch={refetch}
        groupMembers={groupMembers}
      />
      <Styled.RightArrow size="30" onClick={setNextWeek} />
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
          <Styled.Action>
            <Styled.ActionTitle>
              <FormattedMessage {...messages.chooseMember} />
            </Styled.ActionTitle>
            <Styled.UsersIcon size="40" onClick={setModalUsersOpen} />
          </Styled.Action>
        </Styled.ActionsContainer>
      </Styled.CalendarOptionsContainer>
      <Modal visible={modalEventVisible} title="Add new event" onClose={setModalEventClose}>
        <NewEvent
          onIntervalSelect={handleSelect}
          onClose={setModalEventClose}
          groupMembers={groupMembers}
          refetch={refetch}
        />
      </Modal>
      <Modal visible={modalCalendarVisible} title="Select a date to display" onClose={setModalCalendarClose}>
        <ReactCalendar onChange={onDateChange} value={new Date()} />
      </Modal>
      <Modal visible={modalUsersVisible} title="Select users to display" onClose={setModalUsersClose}>
        <CalendarUsersList state={state} dispatch={dispatch} onSave={saveUsers} groupMembers={groupMembers} />
      </Modal>
    </Styled.Container>
  )
}

const withQuery = Component => props => {
  const [weekFirstDay, setFirstDay] = useState(
    dayjs()
      .startOf('week')
      .startOf('day'),
  )
  const dateFrom = weekFirstDay.format()
  const dateTo = weekFirstDay.add(DAYS_NUMBER, 'days').format()
  return (
    <Query
      query={GET_EVENTS_QUERY}
      fetchPolicy="cache-and-network"
      variables={{
        id: appLocalStorage.getSession().group.id,
        dateFrom,
        dateTo,
      }}
    >
      {({ loading, error, data, refetch }) => {
        if (loading)
          return (
            <Styled.SpinnerContainer>
              <Spinner size={15} border={1.5} />
            </Styled.SpinnerContainer>
          )
        const errors = formatGraphqlErrors(error)
        if (!isEmpty(errors)) return <InformationBox fullWidth>{head(errors)}</InformationBox>
        return (
          <Component {...props} data={data} weekFirstDay={weekFirstDay} setFirstDay={setFirstDay} refetch={refetch} />
        )
      }}
    </Query>
  )
}

export default compose(withQuery)(Calendar)
