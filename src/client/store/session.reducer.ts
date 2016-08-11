import { SESSION_ACTIONS } from '../actions/session.actions';

export interface IMessageState {
  message: string;
  from: string;
}

export interface ISessionState {
  messages: IMessageState[];
  role: string;
}

const INIT_STATE: ISessionState = {
  messages: [],
  role: ''
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

      default:
        return state;
  }
}
