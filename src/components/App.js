import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from './feed.js';
import Article from './article.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/:articleId" element={<Article isSinglePage={true} />} />
      </Routes>
    </BrowserRouter>
  );
}
