import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import configureStore from './store';
import DevTools from './dev-tools';
import appId from './inboxsdk-app-id';

InboxSDK.load('1.0', appId).then(sdk => {

  const container = document.createElement('div');
  container.setAttribute('id', 'hypha-app');
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(container);

  const initial = {
    app: { sdk },
    users: {},
    panels: {
      list: [],
      entities: {},
    },
  };

  ReactDOM.render(
    <Provider store={configureStore(initial)}>
      <div>
        <App />
      </div>
    </Provider>,
  container);

});
