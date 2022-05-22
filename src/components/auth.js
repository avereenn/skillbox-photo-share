import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../constants.js';

async function getAuthToken(code) {
  const { OAUTH_URL, SECRET, POST_PARAMS: { client_id, redirect_uri } } = constants.unsplashApi;
  const authResponse = await fetch(`OAUTH_URL`, {
    method: `POST`,
    client_id,
    client_secret: SECRET,
    redirect_uri,
    code,
    grant_type: `authorization_code`
  });
  const { access_token } = authResponse;

  return access_token;
}

export default function Auth() {
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const authCode = searchParams.has(`code`) ? searchParams.get(`code`) : null;

  if (authState.isAuthorized || authCode) {
    if (authCode) {
      getAuthToken(authCode).then(token => {
        dispatch({
          type: `auth/setAuthorized`,
          isAuth: true,
          token
        });
      });
    } else return <Navigate to="/feed" replace />;

  }

    if (!authCode) {
      const { unsplashApi: { OAUTH_URL, POST_PARAMS: { client_id, redirect_uri, response_type, scope } } } = constants;
      const redirectParams = `client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=${response_type}&scope=${scope}`;

      window.location = `${OAUTH_URL}?${redirectParams}`;

      return (
        <div>Redirecting...</div>
      );
    }
  }
