import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Router, Redirect } from 'react-router-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import styled from '@emotion/styled';

import history from 'utils/history.utils';
import store from 'store';
import theme from 'constants/themes.constants';
import IssuesList from 'components/issuesList';
import IssuePage from 'components/issuePage';

class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StyledHeader>React issues on GitHub</StyledHeader>
          <Router history={history}>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/facebook/react/issues" />}
            />
            <Route exact path="/facebook/react/issues" component={IssuesList} />
            <Route path="/facebook/react/issues/:id" component={IssuePage} />
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
`;

export default App;
