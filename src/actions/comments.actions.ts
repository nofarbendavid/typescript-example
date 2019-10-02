import { Comment } from 'types/comments.types';
import { ApiAction } from 'actions/api.actions';
import { BaseAction } from 'types/base-redux.types';

export const COMMENTS_LABEL = 'comments';

export const FETCH_COMMENTS = '[comments] fetch comments';
export const SET_COMMENTS = '[comments] set comments';

export interface SetCommentsAction extends BaseAction {
  payload: {
    comments: Comment[];
  };
}

type CommentsApiResponse = Comment[];

const BASE_URL = 'https://api.github.com';
const PATH = 'repos/facebook/react/issues';

export const fetchComments = (id: number): ApiAction<CommentsApiResponse> => {
  return {
    type: FETCH_COMMENTS,
    meta: {
      api: true
    },
    payload: {
      networkLabel: COMMENTS_LABEL,
      method: 'get',
      baseUrl: BASE_URL,
      path: `${PATH}/${id}/comments`,
      onSuccess: (commentsResponse: CommentsApiResponse) =>
        setComments(commentsResponse)
    }
  };
};

export const setComments = (comments: Comment[]): SetCommentsAction => {
  return {
    type: SET_COMMENTS,
    payload: {
      comments
    }
  };
};
