import { handleActions } from 'redux-actions';
import { CommentsMap } from 'types/comments.types';
import * as AT from 'actions/comments.actions';
import { SetCommentsAction } from 'actions/comments.actions';
import { get, keyBy, set } from 'lodash/fp';

export type CommentsState = {
  comments: CommentsMap;
};

const initialState: CommentsState = {
  comments: {}
};

const commentsReducer = handleActions(
  {
    [AT.SET_COMMENTS]: (
      state: CommentsState,
      action: SetCommentsAction
    ): CommentsState => {
      const comments = get('payload.comments', action);
      const normalizedComments = keyBy('id', comments);

      return set('comments', normalizedComments, state);
    }
  },
  initialState
);

export default commentsReducer;
