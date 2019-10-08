import { checkAccessLocalStorage } from './LocalStorageAccess'

export const USER_DATA_FILENAME = 'user_data'

const localStorage = () => {
  const getSession = () => (checkAccessLocalStorage() ? JSON.parse(localStorage.getItem(USER_DATA_FILENAME)) : null)
  const removeSession = () => (checkAccessLocalStorage() ? localStorage.removeItem(USER_DATA_FILENAME) : null)
  const saveSession = data =>
    checkAccessLocalStorage() ? localStorage.setItem(USER_DATA_FILENAME, JSON.stringify(data)) : null
  const updateSession = (field, newData) => {
    if (checkAccessLocalStorage()) {
      const session = getSession()
      return saveSession({ ...session, [field]: newData })
    }
    return null
  }
  return {
    getSession,
    removeSession,
    saveSession,
    updateSession,
  }
}

export default localStorage()
