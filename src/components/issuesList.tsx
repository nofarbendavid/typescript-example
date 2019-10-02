import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { isEmpty, values } from 'lodash/fp';
import * as issuesActions from 'actions/issues.actions';
import { isLoadingSelector } from 'selectors/network.selectors';
import { filterIssueByStatusSelector } from 'selectors/issues.selectors';
import { State } from 'types/redux.types';
import { IssuesMap } from 'types/isuues.types';
import { IssuesState } from 'reducers/issues.reducer';
import IssueCard from './issueCard';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledFiltersContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  margin-right: 10px;
`;

const StyledCheckbox = styled.div<{ isChecked: boolean }>`
  box-sizing: border-box;
  border: ${({ isChecked }) => !isChecked && '1px solid darkgray'};
  border-radius: 5px;
  height: 17px;
  width: 17px;
  margin-right: 5px;
  cursor: pointer;
  background-color: ${({ isChecked }) => isChecked && '#778899'};
`;

type IssuesListState = {
  shouldDisplayClosed: boolean;
};

class IssuesList extends PureComponent<Props, IssuesListState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldDisplayClosed: true
    };
  }

  componentDidMount() {
    const { issues, fetchIssues } = this.props;
    if (isEmpty(issues)) {
      fetchIssues();
    }
  }

  openIssue = (issueNumber: number): void => {
    const { history } = this.props;
    history.push(`${history.location.pathname}/${issueNumber}`);
  };

  renderIssues = () => {
    const { shouldDisplayClosed } = this.state;
    const { issues, openIssues } = this.props;

    const issuesToDisplay = shouldDisplayClosed
      ? { ...issues }
      : { ...openIssues };

    if (isEmpty(issuesToDisplay)) {
      return <div>No issues to display</div>;
    } else {
      return values(issuesToDisplay).map(issue => {
        return (
          <IssueCard key={issue.id} issue={issue} openIssue={this.openIssue} />
        );
      });
    }
  };

  renderFilters = () => {
    const { shouldDisplayClosed } = this.state;

    return (
      <StyledFiltersContainer>
        <CheckboxContainer>
          <StyledCheckbox
            isChecked={shouldDisplayClosed}
            onClick={() =>
              this.setState({
                shouldDisplayClosed: !shouldDisplayClosed
              })
            }
          />
          Closed
        </CheckboxContainer>
      </StyledFiltersContainer>
    );
  };

  render() {
    const { isLoading } = this.props;

    return (
      <StyledContainer>
        {!isLoading && this.renderFilters()}

        {isLoading ? <div>Loading...</div> : this.renderIssues()}
      </StyledContainer>
    );
  }
}

export interface StateWithIssues extends State {
  issues: IssuesState;
}

interface OwnProps {
  history: any;
}

interface StateProps {
  issues: IssuesMap;
  isLoading: boolean;
  openIssues: IssuesMap;
}

interface DispatchProps {
  fetchIssues: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const mapStateToProps = (state: StateWithIssues): StateProps => ({
  issues: state.issues.issues,
  isLoading: isLoadingSelector(state, issuesActions.ISSUES_LABEL),
  openIssues: filterIssueByStatusSelector(state, 'open')
});

const mapDispatchToProps: DispatchProps = {
  fetchIssues: issuesActions.fetchIssues
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuesList);
