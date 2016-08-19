import { TEACHER_LIST_ACTIONS } from '../actions/teacherList.actions';

export interface ITeacherListState {
  list: any[];
}

const INIT_STATE = {
  list: []
};

export function teacherListReducer(
  state = INIT_STATE,
  action
): ITeacherListState {
  switch (action.type) {
    case TEACHER_LIST_ACTIONS.SET_LIST:
      return Object.assign({}, state, {
        list: action.list
      });
    default:
      return state;
  }
}
