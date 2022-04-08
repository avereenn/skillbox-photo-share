import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './smart-components/App.js';
import SingleArticle from './components/routes/singleArticle.js';
import getFeedStore from './store/store.js';

const rootEl = document.querySelector(`.js-root`);

getFeedStore().then(store => {
  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App store={store} />} />
        <Route path="/:articleId" element={<SingleArticle store={store} />} />
      </Routes>
    </BrowserRouter>,
    rootEl
    );
});

