import { combineReducers } from 'redux';
const persistState = require('redux-localstorage');
import { ISearchState, searchReducer } from './search.reducer';
import { ILoginState, loginReducer } from './login.reducer';
import {
  ITeacherDashboardState,
  teacherDashboardReducer
} from './teacher-dashboard.reducer.ts';

export interface IAppState {
  counter?: number;
  search?: ISearchState;
  userID?: ILoginState;
  teacherDashboard?: ITeacherDashboardState
};

export const rootReducer = combineReducers<IAppState>({
  search: searchReducer,
  login: loginReducer,
  teacherDashboard: teacherDashboardReducer
});

export const enhancers = [
  persistState('counter', { key: 'ng2-redux/examples/counter' })
];

