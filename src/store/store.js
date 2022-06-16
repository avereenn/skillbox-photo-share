import { configureStore } from '@reduxjs/toolkit';
import feed from './actions/feed';
import auth from './actions/auth';

export default configureStore({
  reducer: {
    feed: feed.reducer,
    auth: auth.reducer,
  }
});
