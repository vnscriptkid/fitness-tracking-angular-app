import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { trainingActions, START_TRAINING, STOP_TRAINING, SET_AVAILABLE_TRAINING, SET_FINISHED_TRAINING } from './training.actions';
import { Exercise } from './exercise.model';

export interface State {
  availableExercises: Exercise[];
  exerciseRecords: Exercise[];
  activeExercise: Exercise;
}

const initialState: State = {
  availableExercises: [],
  exerciseRecords: [],
  activeExercise: null
};

export function trainingReducer (state = initialState, action: trainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAINING:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAINING:
      return {
        ...state,
        exerciseRecords: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeExercise: { ...state.availableExercises.find(e => e.id === action.payload) }
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeExercise: null
      };
    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<State>('training');

export const getAvailableTrainings = createSelector(getTrainingState, (state: State) => state.availableExercises);
export const getFinishedTraining = createSelector(getTrainingState, (state: State) => state.exerciseRecords);
export const getActiveTraining = createSelector(getTrainingState, (state: State) => state.activeExercise);
export const hasActiveTraining = createSelector(getTrainingState, (state: State) => !!state.activeExercise);
