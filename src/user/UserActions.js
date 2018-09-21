import * as types from '../ActionTypes';

export function UpdateUserAuthStatus(value) {
  return { type: types.UpdateUserAuthStatus, value };
}

export function AddUser(userName, password) {
  return { type: types.AddUser, userName, password };
}
