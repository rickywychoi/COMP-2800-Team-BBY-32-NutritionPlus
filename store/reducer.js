// store/reducer.js

import * as actions from '../store/actions'

export const initialState = {
  isSignedIn: false,  // Signed-in state.
  currentUser: null,  // Current user signed-in.
  userInfo: {},       // information of user to calculate nutrient result
  myCart: []          // final my cart to proceed to checkout & payment
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
        myCart: []
      }
    default: 
      return {...state};
  }
}

export default reducer