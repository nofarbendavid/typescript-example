import { Issue } from 'types/isuues.types';
import { BaseAction } from 'types/base-redux.types';
import { ApiAction } from 'actions/api.actions';

export const ISSUES_LABEL = 'issues';

export const FETCH_ISSUES = '[issues] Fetch issues';
export const SET_ISSUES = '[issues] Set issues';

export interface SetIssuesAction extends BaseAction {
  payload: {
    issues: Issue[];
  };
}
type IssuesApiResponse = Issue[];

const BASE_URL = 'https://api.github.com';
const PATH = 'repos/facebook/react/issues';

export const fetchIssues = (id?: number): ApiAction<IssuesApiResponse> => {
  const path = id ? `${PATH}/${id}` : PATH;

  return {
    type: FETCH_ISSUES,
    meta: {
      api: true
    },
    payload: {
      networkLabel: ISSUES_LABEL,
      method: 'get',
      baseUrl: BASE_URL,
      path: path,
      data: { state: 'all' },
      onSuccess: (issuesResponse: IssuesApiResponse) =>
        setIssues(issuesResponse)
    }
  };
};

export const setIssues = (issues: Issue[]): SetIssuesAction => {
  return {
    type: SET_ISSUES,
    payload: {
      issues
    }
  };
};
