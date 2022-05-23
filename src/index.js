import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.js';
import getFeedStore from './store/store.js';
import authorization from './authorization.js';

const rootEl = document.querySelector(`.js-root`);

// авторизация пользователя
authorization().then(accessToken => {
  // получаем хранилище, передавая ему токен авторизации
  getFeedStore(accessToken).then(store => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      rootEl
    );
  })
})
.catch(err => console.log(`Ошибка приложения: ${err}`));