import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos } from '../store/actions/feed.js';
import { fetchAccessToken } from '../store/actions/auth.js'
import Header from './Header.js';
import Footer from './Footer.js';
import Feed from './feed.js';
import Article from './article.js';
import NotFound from './notFound.js';

export default function App() {
  const feedState = useSelector(state => state.feed);
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { pagesNumber } = feedState;
  const status = feedState.status || authState.status || null;
  const error = feedState.error || authState.error || null;

  useEffect(() => {
    dispatch(fetchAccessToken());
  }, [authState.token]);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [pagesNumber]);

  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Feed status={status} error={error} articles={feedState.feed} />} />
          <Route path="photos/:articleId" element={<Article isSinglePage={true} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
