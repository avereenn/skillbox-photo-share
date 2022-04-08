import { createStore } from 'redux';
import reduceFeed from './reducers/reduceFeed.js';
import unsplashApi from '../unsplash.js';

let initialState = {
  feed: [],
};

export default async function getFeedStore() {
  const result = await unsplashApi.photos.list();
  initialState.feed = result.response.results;
  return createStore(reduceFeed, initialState);
}
