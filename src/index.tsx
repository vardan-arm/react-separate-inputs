import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';

import SessionIdContainerComponent from './components/session-id-container.component';

ReactDOM.render(
  <SessionIdContainerComponent
    onChange={val => {
      // eslint-disable-next-line no-console
      console.log(`New value is ${val}`);
    }}
  />,
  document.getElementById('root'),
);
