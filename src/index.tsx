import React from 'react';
import ReactDOM from 'react-dom';
import 'index.scss';

import App from 'components/app';

if (process.env.NODE_ENV === 'development') {
  const Mimic = require('mimic').default;
  Mimic.setAppName('GitHub-issues-typescript');
}

ReactDOM.render(<App />, document.getElementById('root'));
