import filter from 'lodash/filter'

export default (state, action) => {
  const { type, value } = action
  switch (type) {
    case 'add':
      return [...state, value]
    case 'remove':
      return filter(state, el => el !== value)
    default:
      return state
  }
}
