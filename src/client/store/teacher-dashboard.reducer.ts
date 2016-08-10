import { TEACHER_DASHBOARD_ACTIONS } from '../actions/teacher-dashboard.actions';

const { SET_AVAILABILITY } = TEACHER_DASHBOARD_ACTIONS;

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
    case SET_AVAILABILITY:
      return Object.assign({}, state, {
        available: action.value
      });

    default:
      return state;
  }
}
