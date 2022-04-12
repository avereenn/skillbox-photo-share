import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/smart/App.js';
import getFeedStore from './store/store.js';

const rootEl = document.querySelector(`.js-root`);

getFeedStore().then(store => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  );
}).catch(err => console.log(`Ошибка приложения: ${err}`));
