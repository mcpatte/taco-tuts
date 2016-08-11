import { combineReducers } from 'redux';
const persistState = require('redux-localstorage');
import { ISearchState, searchReducer } from './search.reducer';
import { ILoginState, loginReducer } from './login.reducer';
import { ITeacherState, teacherReducer } from './teacher.reducer';
import { ISessionState, sessionReducer } from './session.reducer';

export interface IAppState {
  counter?: number;
  search?: ISearchState;
  userData?: ILoginState;
  login?: ILoginState;
  teacher?: ITeacherState;
  session?: ISessionState;
};

export const rootReducer = combineReducers<IAppState>({
  search: searchReducer,
  login: loginReducer,
  teacher: teacherReducer,
  session: sessionReducer
});

export const enhancers = [
  persistState('counter', { key: 'ng2-redux/examples/counter' })
];
