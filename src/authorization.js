import constants from './constants.js';

async function getAuthToken(code) {
  const localToken = localStorage.getItem(constants.LOCAL_STORAGE_KEY);

  if(localToken) return localToken;

  console.log(code);
  const { OAUTH_URL, SECRET, POST_PARAMS: { client_id, redirect_uri } } = constants.unsplashApi;
  const authResponse = await fetch(OAUTH_URL, {
    method: `POST`,
    client_id,
    client_secret: SECRET,
    redirect_uri,
    code,
    grant_type: `authorization_code`
  });

  console.dir(authResponse);
  const { access_token } = authResponse;
  if(!access_token) throw(new Error(`ключ не получен`));
  localStorage.setItem(constants.LOCAL_STORAGE_KEY, access_token);

  return access_token;
}

export default async function authorization() {
  const authCode = window.location.search.split(`?code=`)[1];
  let accessToken;

  if (authCode) {
    accessToken = await getAuthToken(authCode);
    return accessToken;
  }

  const { unsplashApi: { OAUTH_URL, POST_PARAMS: { client_id, redirect_uri, response_type, scope } } } = constants;
  const redirectParams = `client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=${response_type}&scope=${scope}`;

  window.location = `${OAUTH_URL}?${redirectParams}`;
}
