import * as actions from '../store/actions'

export const initialState = {
  isSignedIn: false,  // Signed-in state.
  currentUser: null   // Current user signed-in.
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNIN:
      return {
        ...state,
        isSignedIn: !!action.payload,
        currentUser: action.payload
      }
    default: 
      return {...state};
  }
}


export default reducer