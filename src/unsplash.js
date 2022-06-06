import Unsplash from 'unsplash-js';
import constants from './constants.js';
import { getCallbackUrl } from './utils.js';

const { ACCESS_KEY, SECRET } = constants.unsplashApi;
const unsplashApi = new Unsplash({
  accessKey: ACCESS_KEY,
  secret: SECRET,
  callbackUrl: getCallbackUrl(),
});

export default unsplashApi;
