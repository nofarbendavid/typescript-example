import { createSelector } from 'reselect';
import { StateWithIssues } from 'components/issuesList';
import { IssuesMap } from '../types/isuues.types';
import { values, keyBy } from 'lodash/fp';

//this selector also receive the second argument (status)
//but because we are  not using it we can omit as not required
export const issuesSelector = (state: StateWithIssues): IssuesMap => {
  return state.issues.issues;
};

export const filterIssueByStatusSelector = createSelector(
  issuesSelector,
  (_state: StateWithIssues, status: string) => status, // (_state, props) ignore the state argument
  (issues: IssuesMap, status: string) => {
    const issuesArray = values(issues);

    return keyBy('number', issuesArray.filter(issue => issue.state === status));
  }
);
