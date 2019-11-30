import dayjs from 'dayjs'
import { SCALE_UNIT } from './constants'

export const getOffset = time => {
  const midnight = dayjs(time).startOf('day')
  return time.diff(midnight, 'm')
}

export const getMoment = (day, numberOfUnits, offset = 0) => {
  if (SCALE_UNIT * numberOfUnits + offset >= 24 * 60) {
    return dayjs(day)
      .hour(23)
      .minute(59)
      .second(59)
  }
  return dayjs(day)
    .hour(0)
    .minute(0)
    .second(0)
    .add(SCALE_UNIT * numberOfUnits + offset, 'm')
}

export const getNumberOfCells = (time, duration, isUpRound, offset = 0) => {
  const midnight = dayjs(time)
    .startOf('day')
    .add(offset, 'm')
  const testTime = dayjs(time)
  if (testTime.format('HH:mm') === '23:59') {
    testTime.add(1, 'm')
  }
  const result = isUpRound
    ? Math.ceil(testTime.diff(midnight, 'm') / duration)
    : Math.floor(testTime.diff(midnight, 'm') / duration)
  if (result < 0) {
    return 0
  }
  return result
}

export const getIntervalsByDuration = () => {
  // const startIndex = getNumberOfCells(startTime, duration, false)
  // const endIndex = getNumberOfCells(endTime, duration, true)
  const startIndex = 0
  const endIndex = 24
  let start = dayjs()
    .hour(0)
    .minute(0)
    .second(0)
  let end
  const result = []

  for (let i = startIndex; i < endIndex; i += 1) {
    end = start.clone().add(SCALE_UNIT, 'm')
    const interval = {
      start,
      end,
    }
    result.push(interval)
    start = end
  }
  let lastElement = result.pop()
  if (lastElement.end.format('HH:mm') === '00:00') {
    lastElement = {
      start: lastElement.start,
      end: dayjs()
        .hour(23)
        .minute(59)
        .second(59),
    }
  }
  result.push(lastElement)
  return result
}

export const getDayIntervals = (day, scaleIntervals) =>
  scaleIntervals.map(scaleInterval => {
    const start = dayjs(day)
      .hour(scaleInterval.start.hour())
      .minute(scaleInterval.start.minute())
      .second(0)
    const end = dayjs(day)
      .hour(scaleInterval.end.hour())
      .minute(scaleInterval.end.minute())
      .second(0)
    return {
      start,
      end,
    }
  })

export const getIntervals = (start, end) => {
  const diffDays = end.diff(start, 'days')
  const result = []

  for (let i = 0; i <= diffDays; i += 1) {
    const startInterval = dayjs(start).add(i, 'day')
    const endInterval = dayjs(start)
      .add(i, 'day')
      .hour(end.hour())
      .minute(end.minute())
      .second(0)
    result.push({
      start: startInterval,
      end: endInterval,
    })
  }

  return result
}
