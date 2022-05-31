import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toJson } from 'unsplash-js';
import constants from '../constants.js';
import unsplashApi from '../unsplash.js';

// асинхронная логика хранилища
// запрос первых фото для ленты
export const fetchPhotos = createAsyncThunk(
  `feed/fetchPhotos`,
  async function (payload, { rejectWithValue }) {
    try {
      const response = await unsplashApi.photos.listPhotos();

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}. ${response.text}`);
      }

      const photoList = await toJson(response);

      return photoList;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

// запрос на изменение состояния лайка фото
export const toggleLike = createAsyncThunk(
  `feed/toggleLike`,
  async function (id, { rejectWithValue, dispatch, getState }) {
    try {
      const currentPhoto = getState().feed.feed.find(photo => photo.id === id);
      const { liked_by_user: isLiked } = currentPhoto;
      const response = isLiked ? await unsplashApi.photos.unlikePhoto(id) : await unsplashApi.photos.likePhoto(id);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}. ${response.text}`);
      }

      const result = await toJson(response);
      const { liked_by_user, likes } = result.photo;
      dispatch(toggleLikePhoto({ id, liked_by_user, likes }));
    } catch (error) {
      console.dir(error);
      rejectWithValue(error.message);
    }
  });

// авторизация пользователя
export const fetchAccessToken = createAsyncThunk(
  `feed/fetchAccessToken`,
  async function (payload, { rejectWithValue }) {
    try {
      const localToken = localStorage.getItem(constants.LOCAL_STORAGE_KEY);

      if (!/null|undefined|^\s*$/.test(localToken)) {
        unsplashApi.auth.setBearerToken(localToken);
        return localToken;
      }
      // очищаем localStorage от некорректных данных
      localStorage.removeItem(constants.LOCAL_STORAGE_KEY);

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

      return access_token;
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
    toggleLikePhoto: (state, { payload }) => {
      const { id, liked_by_user, likes } = payload;
      const targetPhoto = state.feed.find(el => el.id === id);
      targetPhoto.liked_by_user = liked_by_user;
      targetPhoto.likes = likes;
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
      state.token = payload;
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
