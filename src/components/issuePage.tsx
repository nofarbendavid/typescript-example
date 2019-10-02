import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { isEmpty, values } from 'lodash/fp';
import * as commentsActions from 'actions/comments.actions';
import * as issuesAction from 'actions/issues.actions';
import { State } from 'types/redux.types';
import { IssuesState } from 'reducers/issues.reducer';
import { Issue, StatusComponent } from 'types/isuues.types';
import { calcTimeDeltaFromCurrentTime } from 'utils/date.utils';
import { CommentsMap } from 'types/comments.types';
import { CommentsState } from 'reducers/comments.reducer';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  font-size: 26px;
  font-weight: bold;
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div``;

const IssueNumber = styled.div`
  color: #a3aab0;
  margin-left: 10px;
`;

const SubHeader = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 5px;
`;

const Status = styled.div<StatusComponent>`
  color: white;
  font-weight: bold;
  background-color: ${({ isOpen }) => (isOpen ? '#37be4e' : '#d3d3d3')};
  margin-right: 10px;
  padding: 5px;
  border-radius: 5px;
`;

const BackButton = styled.button`
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 15px;
  outline: none;
`;

const IssueBody = styled.pre`
  margin: 20px 10px 0px 10px;
  width: 45%;
  justify-content: center;
  border: 1px solid #d1d5da;
  border-radius: 5px;
  padding: 15px;
  white-space: pre-wrap;
`;

class IssuePage extends PureComponent<Props> {
  componentDidMount() {
    const {
      issueData,
      fetchComments,
      fetchIssues,
      match: { params }
    } = this.props;

    if (isEmpty(issueData)) {
      fetchIssues(params.id);
    }

    fetchComments(params.id);
  }

  renderComments = () => {
    const { comments } = this.props;

    if (isEmpty(comments)) {
      return <div>No comments</div>;
    } else {
      return values(comments).map(comment => {
        return <IssueBody key={comment.id}>{comment.body}</IssueBody>;
      });
    }
  };

  render() {
    if (isEmpty(this.props.issueData)) {
      return null;
    }

    const { history, issueData } = this.props;

    const {
      title,
      number: issueNumber,
      state,
      user: { login: userName },
      created_at,
      comments,
      body
    } = issueData;
    return (
      <StyledContainer>
        <Header>
          <Title>{title}</Title>
          <IssueNumber>#{issueNumber}</IssueNumber>
        </Header>
        <SubHeader>
          <Status isOpen={state === 'open'}>{state}</Status>
          <div>
            {userName} opened this issue{' '}
            {calcTimeDeltaFromCurrentTime(created_at)} ago, {comments} comments
          </div>
        </SubHeader>
        <BackButton onClick={() => history.goBack()}>back</BackButton>
        <IssueBody>{body}</IssueBody>
        {comments > 0 && this.renderComments()}
      </StyledContainer>
    );
  }
}

interface StateWithIssues extends State {
  issues: IssuesState;
  comments: CommentsState;
}

interface OwnProps {
  history: any;
  match: {
    params: any;
  };
}

interface StateProps {
  issueData: Issue;
  comments: CommentsMap;
}

interface DispatchProps {
  fetchComments: (id: number) => void;
  fetchIssues: (id: number) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const mapStateToProps = (
  state: StateWithIssues,
  ownProps: OwnProps
): StateProps => {
  return {
    issueData: state.issues.issues[ownProps.match.params.id],
    comments: state.comments.comments
  };
};

const mapDispatchToProps: DispatchProps = {
  fetchIssues: issuesAction.fetchIssues,
  fetchComments: commentsActions.fetchComments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuePage);
