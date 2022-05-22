import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import constants from '../constants.js';
import unsplashApi from '../unsplash.js';

export default async function getFeedStore(accessToken) {
  const result = await unsplashApi.photos.list();
  const initialState = result.response.results || [];

  const feedSlice = createSlice({
    name: `feed`,
    initialState,
    reducers: {
      toggleLikePhoto(state, { response, payload }) {
        const targetPhotoIndex = state.indexOf(state.find(el => el.id === payload));
        state.splice(targetPhotoIndex, 1, response);
      }
    },
  });

  const authSlice = createSlice({
    name: `auth`,
    initialState: accessToken,
    reducers: {
      setAccessToken(state, { payload }) {
        state.accessToken = payload;
        localStorage.setItem(constants.LOCAL_STORAGE_KEY, token);
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
