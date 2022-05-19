import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import constants from '../constants.js';

export default function Auth() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const authCode = searchParams.has(`code`) ? searchParams.get(`code`) : null;
  const dispatch = useDispatch();

  if (!authCode) {
    const { unsplashApi: { OAUTH_URL, POST_PARAMS: { client_id, redirect_uri, response_type, scope } } } = constants;
    const redirectParams = `client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=${response_type}&scope=${scope}`;

    // window.location = `${OAUTH_URL}?${redirectParams}`;

    return (
      <div>Redirecting...</div>
    );
  }
  
  dispatch({
    type: `auth/setAuthorized`,
    payload: true
  });
  
  dispatch({
    type: `auth/setBearerToken`,
    payload: authCode
  });

  return <Navigate to="/feed" replace />;
}