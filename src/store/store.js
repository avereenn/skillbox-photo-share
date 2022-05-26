import { configureStore, createSlice } from '@reduxjs/toolkit';
import constants from '../constants.js';
import unsplashApi from '../unsplash.js';

const initialState = [];

// слайс для ленты
const feedSlice = createSlice({
  name: `feed`,
  initialState,
  reducers: {
    updateFeed(state, { payload }) {
      return payload;
    },
    addArticlesToFeed(state, { payload }) {
      state.push(...payload);
    },
    toggleLikePhoto(state, { response, payload }) {
      const targetPhotoIndex = state.indexOf(state.find(el => el.id === payload));
      state.splice(targetPhotoIndex, 1, response);
    }
  },
});

// слайс для авторизации
const authSlice = createSlice({
  name: `auth`,
  initialState: ``,
  reducers: {
    setAccessToken(state, { payload }) {
      unsplashApi.auth.setBearerToken(payload);
      localStorage.setItem(constants.LOCAL_STORAGE_KEY, payload);
      return payload;
    },
  },
});

// экспортируем хранилище
export default configureStore({
  reducer: {
    feed: feedSlice.reducer,
    auth: authSlice.reducer,
  }
});

export const { updateFeed, addArticlesToFeed, toggleLikePhoto } = feedSlice.actions;
export const { setAccessToken } = authSlice.actions;
