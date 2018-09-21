import * as types from '../ActionTypes';

let initialState = {
  // Authenticated: false,
  Token: localStorage.getItem('token'),
  UserName: 'HeWhoSays',
  UserPassword: 'Ni',
  UserRights: {
    CreateSprint: true
  }
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case types.UpdateUserAuthStatus:
      return {
        ...state,
        Authenticated: action.value.Authenticated,
        Token: action.value.Token
      };
    case types.AddUser:
      return {
        ...state,
        UserName: action.userName,
        UserPassword: action.password
      };
    default:
      return state;
  }
}
