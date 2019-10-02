import { combineReducers } from 'redux';

import network from 'reducers/network.reducer';
import issues from 'reducers/issues.reducer';
import comments from 'reducers/comments.reducer';

export const reducersMap = {
  network,
  issues,
  comments
};

export default combineReducers(reducersMap);
