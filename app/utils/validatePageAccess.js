import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import UserActions from '../redux/UserRedux'

import appLocalStorage from './localStorage'

const validateStoredUser = storedUser => {
  if (!storedUser || get(storedUser, 'token') === '') {
    return false
  }

  const token = get(storedUser, 'token')
  return token
}

// eslint-disable-next-line no-unused-vars
export default store => {
  const storedUser = appLocalStorage.getSession()

  if (validateStoredUser(storedUser)) {
    store.dispatch(UserActions.storeData(storedUser))
    return true
  }
  /* No session stored in local storage - clear redux and redirect to login */
  appLocalStorage.removeSession()
  store.dispatch(UserActions.clearData())
  return false
}
