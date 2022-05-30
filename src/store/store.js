import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toJson } from 'unsplash-js';
import constants from '../constants.js';
import unsplashApi from '../unsplash.js';

// асинхронная логика хранилища
// запрос первых фото для ленты
export const fetchPhotos = createAsyncThunk(
  `feed/fetchPhotos`,
  async function (payload, { rejectWithValue, dispatch }) {
    try {
      const response = await unsplashApi.photos.listPhotos();

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}. ${response.text}`);
      }

      const photoList = await toJson(response);

      dispatch(initFeed(photoList));

      return photoList;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

// запрос на изменение состояния лайка фото
export const toggleLike = createAsyncThunk(
  `feed/toggleLike`,
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await unsplashApi.photos.likePhoto(id);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}. ${response.text}`);
      }

      const targetPhoto = await toJson(response);

      dispatch(toggleLikePhoto(targetPhoto));

      return targetPhoto;
    } catch (error) {
      rejectWithValue(error.message);
    }
  });

// авторизация пользователя
export const fetchAccessToken = createAsyncThunk(
  `feed/getAccessToken`,
  async function (payload, { rejectWithValue, dispatch }) {
    try {
      const localToken = localStorage.getItem(constants.LOCAL_STORAGE_KEY);

      if (!/null|undefined/.test(localToken)) {
        dispatch(setAccessToken(localToken));
        return localToken;
      }

      const authCode = window.location.search.split(`code=`)[1];

      if (!authCode) {
        const authenticationUrl = unsplashApi.auth.getAuthenticationUrl([
          `public`,
          `write_likes`,
        ]);

        window.location = authenticationUrl;
      }

      const response = await unsplashApi.auth.userAuthentication(authCode);
      const authInfo = await toJson(response);
      const { access_token } = authInfo;

      unsplashApi.auth.setBearerToken(access_token);
      localStorage.setItem(constants.LOCAL_STORAGE_KEY, access_token);
      dispatch(setAccessToken(access_token));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

function setError(state, { payload }) {
      state.status = `rejected`;
      state.error = payload;
    }

// слайс для ленты
const feedSlice = createSlice({
  name: `feed`,
  initialState: {
    feed: [],
    status: null,
    error: null,
  },
  reducers: {
    initFeed(state, { payload }) {
      return payload;
    },
    addArticlesToFeed(state, { payload }) {
      state.push(...payload);
    },
    toggleLikePhoto(state, { payload }) {
      const targetPhotoIndex = state.indexOf(state.find(el => el.id === payload.id));
      state.splice(targetPhotoIndex, 1, payload);
    }
  },
  extraReducers: {
    [fetchPhotos.pending]: (state) => {
      state.status = `loading`;
      state.error = null;
    },
    [fetchPhotos.fulfilled]: (state, { payload }) => {
      state.status = `resolved`;
      state.feed = payload;
    },
    [fetchPhotos.rejected]: setError,
    [toggleLike.rejected]: setError,
  },
});

// слайс для авторизации
const authSlice = createSlice({
  name: `auth`,
  initialState: {
    token: null,
    status: null,
    error: null,
  },
  reducers: {
    setAccessToken(state, { payload }) {
      unsplashApi.auth.setBearerToken(payload);
      localStorage.setItem(constants.LOCAL_STORAGE_KEY, payload);
      state.token = payload;
    },
  },
  extraReducers: {
    [fetchAccessToken.pending]: (state) => {
    state.status = `loading`;
    state.error = null;
    },
    [fetchAccessToken.fulfilled]: (state, { payload }) => {
    state.status = `resolved`;
    state.feed = payload;
    },
    [fetchAccessToken.rejected]: setError,
  }
});

// экспортируем хранилище
export default configureStore({
  reducer: {
    feed: feedSlice.reducer,
    auth: authSlice.reducer,
  }
});

export const { initFeed, addArticlesToFeed, toggleLikePhoto } = feedSlice.actions;
export const { setAccessToken } = authSlice.actions;