import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: `_BuQyytLcr2DdRU5sc8-qC2DOHmQBGJ1j3coaI7Gb-o`,
  secret: `GLFgFOQUhy3FKCJojCwfvdvxytjf_3FxG7mVYbceipY`,
  callbackUrl: `${window.location.origin}/auth`,
});

export default unsplashApi;
