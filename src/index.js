import React from 'react';
import ReactDOM from 'react-dom';
import App from './smart-components/App.js';
import getFeedStore from './store.js';

const rootEl = document.querySelector(`.js-root`);

getFeedStore().then(store => {
  ReactDOM.render(<App store={store} />, rootEl);
});

