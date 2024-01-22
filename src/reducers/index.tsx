// rootReducer.ts

import { combineReducers } from 'redux';
import formReducer from './form';

const rootReducer = combineReducers({
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
