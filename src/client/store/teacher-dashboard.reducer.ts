import { TEACHER_DASHBOARD_ACTIONS } from '../actions';

const { TOGGLE_AVAILABILITY } = TEACHER_DASHBOARD_ACTIONS;

export interface ITeacherDashboardState {
  available: boolean;
}

const INIT_STATE = {
  available: false
};

export function teacherDashboardReducer(
  state = INIT_STATE,
  action
): ITeacherDashboardState {
  switch (action.type) {
    case TOGGLE_AVAILABILITY:
      return Object.assign({}, state, {
        available: !state.available
      });

    default:
      return state;
  }
}
