import { handleActions } from 'redux-actions';
import * as AT from 'actions/issues.actions';
import { IssuesMap } from 'types/isuues.types';
import { SetIssuesAction } from 'actions/issues.actions';
import { get, keyBy, set, castArray } from 'lodash/fp';

export type IssuesState = {
  issues: IssuesMap;
};

const initialState: IssuesState = {
  issues: {}
};

const issuesReducer = handleActions(
  {
    [AT.SET_ISSUES]: (
      state: IssuesState,
      action: SetIssuesAction
    ): IssuesState => {
      const issues = castArray(get('payload.issues', action));
      const normalizedIssues = keyBy('number', issues);

      return set('issues', normalizedIssues, state);
    }
  },
  initialState
);

export default issuesReducer;
