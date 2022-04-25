import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './index.js';
import Auth from './auth.js';
import Feed from './feed.js';
import Article from './article.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/:articleId" element={<Article isSinglePage={true} />} />
      </Routes>
    </BrowserRouter>
  );
}
