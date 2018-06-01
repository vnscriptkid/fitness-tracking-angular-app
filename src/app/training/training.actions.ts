import { Exercise } from './exercise.model';
import { Action } from '@ngrx/store';

export const START_TRAINING = 'START_TRAINING';
export const STOP_TRAINING = 'STOP_TRAINING';
export const SET_AVAILABLE_TRAINING = 'SET_AVAILABLE_TRAINING';
export const SET_FINISHED_TRAINING = 'SET_FINISH_TRAINING';

export class SetAvailableTraining implements Action {
  readonly type = SET_AVAILABLE_TRAINING;

  constructor(public payload: Exercise[]) { }
}

export class SetFinishedTraining implements Action {
  readonly type = SET_FINISHED_TRAINING;

  constructor(public payload: Exercise[]) { }
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string) { }
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type trainingActions = StartTraining | StopTraining | SetAvailableTraining | SetFinishedTraining;
