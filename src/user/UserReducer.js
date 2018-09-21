import * as types from '../ActionTypes';

let initialState = {
  Authenticated: false,
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
        Authenticated: action.value
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
