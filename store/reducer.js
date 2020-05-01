// store/reducer.js

import * as actions from '../store/actions'

export const initialState = {
  isSignedIn: false,  // Signed-in state.
  currentUser: null,  // Current user signed-in.
  userEER: 0          // Estimated Energy Requirement for user
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNIN:
      return {
        ...state,
        isSignedIn: !!action.payload,
        currentUser: action.payload
      }
    case actions.SUBMITENTRYUSERINPUT:
      return {
        ...state,
        userEER: action.payload
      }
    default: 
      return {...state};
  }
}


export default reducer