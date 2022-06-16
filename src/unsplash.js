import Unsplash from 'unsplash-js';
import { ACCESS_KEY, SECRET } from './constants.js';
import { getCallbackUrl } from './utils.js';

const unsplashApi = new Unsplash({
  accessKey: ACCESS_KEY,
  secret: SECRET,
  callbackUrl: getCallbackUrl(),
});

export default unsplashApi;
