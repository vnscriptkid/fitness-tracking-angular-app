import { Action } from '@ngrx/store';
import { AuthActions, START_LOGIN, START_LOGOUT } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

export function authReducers (state = initialState, action: AuthActions) {
  switch (action.type) {
    case START_LOGIN:
      console.log('login action dispatched!');
      return {
        isAuthenticated: true
      };
    case START_LOGOUT:
      return {
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
