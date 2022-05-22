const constants = {
  INITIAL_IMG_DESC: `image from unsplash.com`,
  LOCAL_STORAGE_KEY: `photo-share-state`,
  unsplashApi: {
    API_URL: `https://api.unsplash.com`,
    OAUTH_URL: `https://unsplash.com/oauth/token`,
    ACCESS_KEY: `_BuQyytLcr2DdRU5sc8-qC2DOHmQBGJ1j3coaI7Gb-o`,
    SECRET: `GLFgFOQUhy3FKCJojCwfvdvxytjf_3FxG7mVYbceipY`,
    OAUTH_URL: `https://unsplash.com/oauth/authorize`,
    CALLBACK_URL: `${window.location.origin}/auth`,
    POST_PARAMS: {
      client_id: `_BuQyytLcr2DdRU5sc8-qC2DOHmQBGJ1j3coaI7Gb-o`,
      redirect_uri: window.location.origin,
      response_type: `code`,
      scope: `public+write_likes`
    },
  }
};

export default constants;
