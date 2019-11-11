import { createSelector } from 'reselect'

const selectUser = () => state => {
  console.log(state)
  return state.user
}

export const makeSelectUser = () => {
  return createSelector(
    selectUser(),
    user => user.toJS(),
  )
}
