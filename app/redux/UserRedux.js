// import omit from 'lodash/omit'
import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

// import EFClocalStorage from 'utils/localStorage'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  clearData: null,
  storeData: ['userData', 'mergeData'],
  //   updateAvatarUrl: ['avatarUrl'],
  //   updateRegistrationStep: ['registrationStep'],
  //   updateUserProfile: ['userData'],
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = fromJS({
  profile: {},
})

/* ------------- Reducers ------------- */

export const clearData = () => INITIAL_STATE
export const storeData = (state, { userData, mergeData }) => {
  if (!userData && mergeData) {
    return state.set('profile', state.get('profile').mergeDeep(fromJS(mergeData)))
  }
  return state.set('profile', fromJS(userData))
}
// export const updateAvatarUrl = (state, { avatarUrl }) => {
//   const storedUser = EFClocalStorage.getSession()
//   storedUser.avatar.url = avatarUrl
//   EFClocalStorage.saveSession(storedUser)
//   return state.setIn(['profile', 'avatar', 'url'], avatarUrl)
// }

// export const updateUserProfile = (state, { userData }) => {
//   const storedUser = EFClocalStorage.getSession()
//   const avatarUrl = userData.avatar_url || ''

//   storedUser.avatar.url = avatarUrl
//   storedUser.email = userData.email
//   storedUser.date_of_birth = userData.date_of_birth
//   storedUser.first_name = userData.first_name
//   storedUser.last_name = userData.last_name
//   EFClocalStorage.saveSession(storedUser)

//   return state
//     .set('profile', state.get('profile').mergeDeep(fromJS(omit(userData, 'avatar_url'))))
//     .setIn(['profile', 'avatar', 'url'], avatarUrl)
// }

// export const updateRegistrationStep = (state, { registrationStep }) => {
//   EFClocalStorage.updateSession('registration_step', registrationStep)
//   return state.setIn(['profile', 'registration_step'], registrationStep)
// }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLEAR_DATA]: clearData,
  [Types.STORE_DATA]: storeData,
  //[Types.UPDATE_AVATAR_URL]: updateAvatarUrl,
  //[Types.UPDATE_REGISTRATION_STEP]: updateRegistrationStep,
  //[Types.UPDATE_USER_PROFILE]: updateUserProfile,
})
