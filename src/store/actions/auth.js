import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toJson } from 'unsplash-js';
import { LOCAL_STORAGE_KEY } from '../../constants.js';
import unsplashApi from '../../unsplash.js';
import { setError } from '../../utils.js';

export const fetchAccessToken = createAsyncThunk(
  `feed/fetchAccessToken`,
  async function (authCode, { rejectWithValue }) {
    try {
      const response = await unsplashApi.auth.userAuthentication(authCode);
      const authInfo = await toJson(response);
      const { access_token } = authInfo;

      unsplashApi.auth.setBearerToken(access_token);
      localStorage.setItem(LOCAL_STORAGE_KEY, access_token);

      return access_token;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const auth = createSlice({
  name: `auth`,
  initialState: {
    isAuth: false,
    token: null,
    status: null,
    error: null,
  },
  reducers: {
    setAccessToken(state, { payload }) {
      unsplashApi.auth.setBearerToken(payload);
      localStorage.setItem(LOCAL_STORAGE_KEY, payload);
      state.token = payload;
      state.isAuth = true;
    },
    removeAccessToken(state) {
      unsplashApi.auth.setBearerToken(``);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      state.token = null;
      state.isAuth = false;
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
      state.isAuth = true;
    },
    [fetchAccessToken.rejected]: setError,
  }
});

export default auth;
export const { setAccessToken, removeAccessToken } = auth.actions;
