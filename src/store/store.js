import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import unsplashApi from '../unsplash.js';

let initialState = {
  authorized: {
    isAuthorized: false,
    bearerToken: ``,
  },
  feed: [],
};

export default async function getFeedStore() {
  const result = await unsplashApi.photos.list();

  initialState.feed = result.response.results;

  const feedSlice = createSlice({
    name: `feed`,
    initialState: initialState.feed,
    reducers: {
      toggleLikePhoto(state, { response, payload }) {
        const targetPhotoIndex = state.feed.indexOf(state.feed.find(el => el.id === payload));
        state.feed.splice(targetPhotoIndex, 1, response);
      }
    },
  });

  const authSlice = createSlice({
    name: `auth`,
    initialState: initialState.authorized,
    reducers: {
      setAuthorized(state, { payload }) {
        state.isAuthorized = payload;
      },
      setBearerToken(state, { payload }) {
        state.bearerToken = payload;
      },
    },
  });

  return configureStore({
    reducer: {
      feed: feedSlice.reducer,
      auth: authSlice.reducer,
    }
  });
}
