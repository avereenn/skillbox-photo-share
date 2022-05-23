import constants from './constants.js';

// функциия для получения токена авторизации на основании кода, присланного API
async function getAuthToken(code) {
  // если код сохранён в localStorage возвращаем его
  const localToken = localStorage.getItem(constants.LOCAL_STORAGE_KEY);

  if(localToken) return localToken;

  // делаем запрос на сервер
  const { OAUTH_URL, SECRET, POST_PARAMS: { client_id, redirect_uri } } = constants.unsplashApi;
  console.dir({
    method: `POST`,
    client_id,
    client_secret: SECRET,
    redirect_uri,
    code,
    grant_type: `authorization_code`
  });
  const authResponse = await fetch(OAUTH_URL, {
    method: `POST`,
    client_id,
    client_secret: SECRET,
    redirect_uri,
    code,
    grant_type: `authorization_code`
  });

  // API присылает JSON объект, получаем из него токен авторизации
  const { access_token } = authResponse;

  localStorage.setItem(constants.LOCAL_STORAGE_KEY, access_token);

  return access_token;
}

// функция авторизации
export default async function authorization() {
  // получаем код для авторизации из параметров
  const authCode = window.location.search.split(`?code=`)[1];
  let accessToken;

  // если код есть получаем токен
  if (authCode) {
    accessToken = await getAuthToken(authCode);
    return accessToken;
  }

  // кода нет - делаем запрос кода, перенаправляя пользователя на страницу авторизации unsplash
  const { unsplashApi: { OAUTH_URL, POST_PARAMS: { client_id, redirect_uri, response_type, scope } } } = constants;
  const redirectParams = `client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=${response_type}&scope=${scope}`;

  window.location = `${OAUTH_URL}?${redirectParams}`;
}
