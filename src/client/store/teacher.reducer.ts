import { TEACHER_ACTIONS } from '../actions';

const { TOGGLE_AVAILABILITY } = TEACHER_ACTIONS;

export interface ITeacherState {
  available: boolean;
}

const INIT_STATE = {
  available: false
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

    default:
      return state;
  }
}
