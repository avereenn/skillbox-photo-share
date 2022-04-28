const constants = {
  INITIAL_IMG_DESC: `image from unsplash.com`,
  unsplashApi: {
    OAUTH_URL: `https://unsplash.com/oauth/authorize`,
    POST_PARAMS: {
      client_id: `_BuQyytLcr2DdRU5sc8-qC2DOHmQBGJ1j3coaI7Gb-o`,
      redirect_uri: `${window.location.origin}`,
      response_type: `code`,
      scope: `public+write_likes`
    },
  }
};

export default constants;
