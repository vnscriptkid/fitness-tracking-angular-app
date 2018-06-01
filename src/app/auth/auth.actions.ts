import { Action } from '@ngrx/store';

export const START_LOGIN = 'START_LOGIN';
export const START_LOGOUT = 'START_LOGOUT';

export class Login implements Action {
  readonly type = START_LOGIN;
}

export class Logout implements Action {
  readonly type = START_LOGOUT;
}

export type AuthActions = Login | Logout;
