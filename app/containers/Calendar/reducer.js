import filter from 'lodash/filter'
import uniq from 'lodash/uniq'

export default (state, action) => {
  const { type, value } = action
  switch (type) {
    case 'add':
      return uniq([...state, value])
    case 'remove':
      return filter(state, el => el.id !== value.id)
    default:
      return state
  }
}
