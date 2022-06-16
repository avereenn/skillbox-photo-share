import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toJson } from 'unsplash-js';
import { LOCAL_STORAGE_KEY } from '../../constants.js';
import unsplashApi from '../../unsplash.js';
import { setError } from '../../utils.js';

export const fetchAccessToken = createAsyncThunk(
  `feed/fetchAccessToken`,
  async function (payload, { rejectWithValue }) {
    try {
      const localToken = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (!/null|undefined|^\s*$/.test(localToken)) {
        unsplashApi.auth.setBearerToken(localToken);
        return localToken;
      }

      localStorage.removeItem(LOCAL_STORAGE_KEY);

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
    token: null,
    status: null,
    error: null,
  },
  reducers: {
    setAccessToken(state, { payload }) {
      unsplashApi.auth.setBearerToken(payload);
      localStorage.setItem(LOCAL_STORAGE_KEY, payload);
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

export default auth;
export const { setAccessToken } = auth.actions;
