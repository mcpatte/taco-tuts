import { SESSION_REQUEST_ACTIONS } from '../actions';

export interface ISessionRequestState {
  maxRequests: number;
  pendingRequests: string[];
}

const INIT_STATE: ISessionRequestState = {
  maxRequests: 3,
  pendingRequests: []
};

export function sessionRequestReducer(
  state = INIT_STATE,
  action
): ISessionRequestState {
  switch (action.type) {
    case SESSION_REQUEST_ACTIONS.ADD_REQUEST:
      return Object.assign({}, state, {
        pendingRequests: [
          ...state.pendingRequests,
          action.teacherID
        ]
      });

    case SESSION_REQUEST_ACTIONS.REMOVE_REQUEST:
      return Object.assign({}, state, {
        pendingRequests: state.pendingRequests.filter(
          teacherID => teacherID !== action.teacherID
        )
      });

    case SESSION_REQUEST_ACTIONS.CLEAR_REQUESTS:
      return Object.assign({}, state, {
        pendingRequests: []
      });

    default:
      return state;
  }
}
