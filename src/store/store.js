import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import unsplashApi from '../unsplash.js';

let initialState = [];

export default async function getFeedStore() {
  const result = await unsplashApi.photos.list();

  initialState = result.response.results;

  const feedSlice = createSlice({
    name: `feed`,
    initialState,
    reducers: {},
  });

  return configureStore({
    reducer: {
      feed: feedSlice.reducer,
    }
  });
}
