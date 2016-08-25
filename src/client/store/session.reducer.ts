import { SESSION_ACTIONS, LOGOUT_ACTIONS } from '../actions';

export interface IMessageState {
  message: string;
  from: string;
}

export interface ISessionState {
  messages: IMessageState[];
  role: string;
  sessionID: string;
  studentID: string;
  teacherID: string;
}

const INIT_STATE: ISessionState = {
  messages: [],
  role: '',
  sessionID: '',
  studentID: '',
  teacherID: ''
};

export function sessionReducer(
  state = INIT_STATE,
  action
): ISessionState {
    switch (action.type) {
      case SESSION_ACTIONS.ADD_MESSAGE:
        return Object.assign({}, state, {
          messages: [
            ...state.messages,
            {
              message: action.message,
              from: action.from
            }
          ]
        });

      case SESSION_ACTIONS.SET_ROLE:
        return Object.assign({}, state, {
          role: action.role
        });

      case SESSION_ACTIONS.SET_SESSION_ID:
        return Object.assign({}, state, {
          sessionID: action.sessionID
        });

      case SESSION_ACTIONS.SET_SESSION_DATA:
        return Object.assign({}, state, action.data);

      case SESSION_ACTIONS.LEAVE_SESSION:
        return INIT_STATE;

      case LOGOUT_ACTIONS.LOGOUT:
        return INIT_STATE;

      default:
        return state;
  }
}
