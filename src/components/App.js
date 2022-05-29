import React, { useEffect } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos, getAccessToken } from '../store/store.js';
import Feed from './feed.js';
import Article from './article.js';

export default function App() {
  const feedState = useSelector(state => state.feed);
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccessToken());
  }, [authState]);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Feed articles={feedState} />} />
      <Route path=":articleId" element={<Article isSinglePage={true} />} />
    </Routes>
  );
}
