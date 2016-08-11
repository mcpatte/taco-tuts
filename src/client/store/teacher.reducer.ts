import { TEACHER_ACTIONS } from '../actions';

const {
  TOGGLE_AVAILABILITY,
  ADD_SESSION_REQUEST,
  REMOVE_SESSION_REQUEST
} = TEACHER_ACTIONS;

export interface ITeacherState {
  available: boolean;
  sessions: any[];
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

    case ADD_SESSION_REQUEST:
      return Object.assign({}, state, {
        sessions: [
          ...state.sessions,
          action.session
        ]
      });

    case REMOVE_SESSION_REQUEST:
      return Object.assign({}, state, {
        sessions: state.sessions.filter(session => session !== action.session)
      });

    default:
      return state;
  }
}
