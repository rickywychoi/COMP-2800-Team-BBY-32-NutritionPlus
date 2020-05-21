/**
 * Manages the application's state on change of actions dispatched.
 * 
 * Includes the status of user signed in, the object of current user,
 * the object containing the result of user after nutrition questionnaire,
 * the array containing grocery items of my cart.
 */

import * as actions from './actions'

export const initialState = {
  isSignedIn: false,  // Signed-in state.
  currentUser: null,  // Current user signed-in.
  userInfo: {},       // Information of user to calculate nutrient result
  myCart: [],         // The final my cart to proceed to checkout & payment
  storeToVisit: ""    // A store to visit and buy items
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
        userInfo: action.payload
      }
    case actions.SENDMYCART:
      return {
        ...state,
        myCart: action.payload
      }
    case actions.EMPTYMYCART:
      return {
        ...state,
        myCart: [],
        storeToVisit: ""
      }
    case actions.SETSTORE:
      return {
        ...state,
        storeToVisit: action.payload
      }
    default: 
      return {...state};
  }
}

export default reducer