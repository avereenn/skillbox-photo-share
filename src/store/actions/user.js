import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toJson } from 'unsplash-js';
import unsplashApi from '../../unsplash.js';
import { setError } from '../../utils.js';

export const fetchUserProfile = createAsyncThunk(
  `feed/fetchUserProfile`,
  async function (payload, { rejectWithValue }) {
    try {
      const response = await unsplashApi.currentUser.profile();
      const userInfo = await toJson(response);
      return userInfo;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const user = createSlice({
  name: `user`,
  initialState: {
    userInfo: null,
    status: null,
    error: null,
  },
  reducers: {
    clearUserState(state) {
      state = {
        userInfo: {},
        status: null,
        error: null,
      };
    },
  },
  extraReducers: {
    [fetchUserProfile.pending]: (state) => {
      state.status = `loading`;
      state.error = null;
    },
    [fetchUserProfile.fulfilled]: (state, { payload }) => {
      state.status = `resolved`;
      state.userInfo = payload;
    },
    [fetchUserProfile.rejected]: setError,
  }
});

export default user;
export const { clearUserState } = user.actions;
