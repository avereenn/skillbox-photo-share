import { configureStore } from '@reduxjs/toolkit';
import feed from './actions/feed';
import auth from './actions/auth';
import user from './actions/user';

export default configureStore({
  reducer: {
    feed: feed.reducer,
    auth: auth.reducer,
    user: user.reducer,
  }
});
