import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from '../feed.js';
import SingleArticle from '../routes/singleArticle.js';

export default function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/:articleId" element={<SingleArticle />} />
      </Routes>
    </BrowserRouter>
  );
}
