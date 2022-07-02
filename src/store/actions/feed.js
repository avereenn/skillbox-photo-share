import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toJson } from 'unsplash-js';
import { INIT_PAGE_NUMBER } from '../../constants.js';
import unsplashApi from '../../unsplash.js';
import { setError } from '../../utils.js';

export const fetchPhotos = createAsyncThunk(
  `feed/fetchPhotos`,
  async function (payload, { getState, rejectWithValue }) {
    try {
      const { feed, pagesNumber } = getState().feed;
      const response = await unsplashApi.photos.listPhotos(pagesNumber);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}. ${response.text}`);
      }

      const photoList = await toJson(response);

      // unsplash api иногда дублирует фото, поэтому фильтруем массив результатов
      const result = photoList.filter(el => !feed.find(elem => elem.id === el.id));

      return result;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

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
      rejectWithValue(error.message);
    }
  });

const feed = createSlice({
  name: `feed`,
  initialState: {
    feed: [],
    pagesNumber: INIT_PAGE_NUMBER,
    status: null,
    error: null,
  },
  reducers: {
    incPagesNumber(state) {
      if(state.status !== `resolved`) return;

      state.status = `loading`;
      state.pagesNumber += 1;
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
      state.feed.push(...payload);
    },
    [fetchPhotos.rejected]: setError,
    [toggleLike.rejected]: setError,
  },
});

export default feed;
export const { toggleLikePhoto, incPagesNumber } = feed.actions;
