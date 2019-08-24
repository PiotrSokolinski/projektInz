/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import history from 'utils/history'
import languageProviderReducer from 'containers/LanguageProvider/reducer'
import { reducer as login } from './redux/LoginRedux'
import { reducer as register } from './redux/RegisterRedux'
import { reducer as user } from './redux/UserRedux'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
    login,
    register,
    user,
  })

  return rootReducer
}
