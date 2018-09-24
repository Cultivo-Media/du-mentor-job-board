import { combineReducers } from 'redux';

import mentor from './mentor';
import auth from './auth';

export default combineReducers({
  mentor,
  auth,
});
