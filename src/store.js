import { createStore } from 'redux';
import reduceFeed from './reducers/reduceFeed.js';
import unsplashApi from './unsplash.js';

let initialState = [];

export default async function getFeedStore() {
  const result = await unsplashApi.photos.list();
  initialState = result.response.results;
  return createStore(reduceFeed, initialState);
}