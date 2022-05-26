import React, { useEffect } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken, updateFeed } from '../store/store.js';
import Feed from './feed.js';
import Article from './article.js';
import { toJson } from 'unsplash-js';
import unsplashApi from '../unsplash.js';
import constants from '../constants.js';

export default function App() {
  const feedState = useSelector(state => state.feed);
  const authState = useSelector(state => state.auth);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const authCode = searchParams.get(`code`);
    const localToken = localStorage.getItem(constants.LOCAL_STORAGE_KEY);

    if (!/null|undefined/.test(localToken)) {
      dispatch(setAccessToken(localToken));
      return;
    }

    if (!authCode) {
      const authenticationUrl = unsplashApi.auth.getAuthenticationUrl([
        `public`,
        `write_likes`,
      ]);

      window.location = authenticationUrl;
    }

    unsplashApi.auth.userAuthentication(authCode)
      .then(toJson)
      .then(({ access_token }) => {
        unsplashApi.auth.setBearerToken(access_token);
        localStorage.setItem(constants.LOCAL_STORAGE_KEY, access_token);
        dispatch(setAccessToken(access_token));
      });
  }, [authState]);

  useEffect(() => {
    unsplashApi.photos.listPhotos()
      .then(toJson)
      .then(photoList => {
        console.dir(photoList);
        dispatch(updateFeed(photoList));
      });

  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Feed articles={feedState} />} />
      <Route path=":articleId" element={<Article isSinglePage={true} />} />
    </Routes>
  );
}
