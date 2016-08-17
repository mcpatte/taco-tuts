import { TEACHER_ACTIONS } from '../actions';
import { IRequestState } from './session-request.reducer';

const {
  TOGGLE_AVAILABILITY,
  SET_SESSION_REQUESTS
} = TEACHER_ACTIONS;

export interface ITeacherState {
  available: boolean;
  sessions: IRequestState[];
}

const INIT_STATE = {
  available: false,
  sessions: []
};

export function teacherReducer(
  state = INIT_STATE,
  action
): ITeacherState {
  switch (action.type) {
    case TOGGLE_AVAILABILITY:
      return Object.assign({}, state, {
        available: !state.available
      });

    case SET_SESSION_REQUESTS:
      return Object.assign({}, state, {
        sessions: action.sessions
      });

    default:
      return state;
  }
}
