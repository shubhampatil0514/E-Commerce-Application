import { SET_USER_IMAGE } from '../Actions/userActions';

const userReducer = (state = { profilePicture: null }, action) => {
  switch (action.type) {
    case SET_USER_IMAGE:
      console.log('Previous state:', state); 
      console.log('Action payload:', action.payload); 
      const newState = { ...state, profilePicture: action.payload };
      console.log('New state:', newState);
      return newState;
    default:
      return state;
  }
};

export default userReducer;



  