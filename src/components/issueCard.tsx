import React from 'react';
import styled from '@emotion/styled';
import { Issue, StatusComponent } from 'types/isuues.types';
import { calcTimeDeltaFromCurrentTime } from 'utils/date.utils';
import statusIcon from 'assets/images/exclamation-button.svg';

const StyledIssue = styled.div`
  border: 1px solid #e0e4e8;
  padding: 10px 10px;
  width: 50%;
  display: flex;

  .Issue-container-main {
    flex-grow: 1;
  }
`;

const Icon = styled.img`
  width: 17px;
  height: 17px;
  margin-right: 5px;
  flex-shrink: 0;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;

  &:hover {
    color: #3e6cd5;
    cursor: pointer;
  }
`;

const Comments = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-shrink: 0;
`;

const Footer = styled.div`
  font-size: 12px;
  color: #666069;
`;

const Status = styled.span<StatusComponent>`
  margin-left: 1ch;
  color: ${({ isOpen }) => (isOpen ? '#37be4e' : 'red')};
`;

const IssueCard = ({ issue, openIssue }: Props) => {
  const {
    title,
    comments,
    number: issueNumber,
    created_at,
    user: { login: userName },
    state
  } = issue;

  return (
    <StyledIssue>
      <Icon src={statusIcon} alt="status" />
      <div className="Issue-container-main">
        <Title onClick={() => openIssue(issueNumber)}>
          {title}
          <Status isOpen={state === 'open'}>{state}</Status>
        </Title>
        <Footer>
          #{issueNumber} opened {calcTimeDeltaFromCurrentTime(created_at)} ago
          by {userName}
        </Footer>
      </div>
      <Comments>{comments}</Comments>
    </StyledIssue>
  );
};

type Props = {
  issue: Issue;
  openIssue: (issueNumber: number) => void;
};

export default IssueCard;
