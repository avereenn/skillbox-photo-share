import Unsplash from 'unsplash-js';
import constants from './constants';

const { ACCESS_KEY, SECRET, CALLBACK_URL } = constants.unsplashApi;
const unsplashApi = new Unsplash({
  accessKey: ACCESS_KEY,
  secret: SECRET,
  callbackUrl: CALLBACK_URL,
});

export default unsplashApi;
