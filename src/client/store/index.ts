import { combineReducers } from 'redux';
const persistState = require('redux-localstorage');
import { ISearchState, searchReducer } from './search.reducer';

export interface IAppState {
  counter?: number;
  search?: ISearchState;
};

export const rootReducer = combineReducers<IAppState>({
  search: searchReducer
});

export const enhancers = [
  persistState('counter', { key: 'ng2-redux/examples/counter' })
];

