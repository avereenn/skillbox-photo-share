import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import constants from '../constants.js';

export default function Auth() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const authCode = searchParams.has(`code`) ? searchParams.get(`code`) : null;

  if (!authCode) {
    const { unsplashApi: { OAUTH_URL, POST_PARAMS: { client_id, redirect_uri, response_type, scope } } } = constants;
    const redirectParams = `client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=${response_type}&scope=${scope}`;

    window.location = `${OAUTH_URL}?${redirectParams}`;

    return (
      <div>Redirecting...</div>
    );
  }

  return (
    <div>
      Autentication completed!
      <Link to="/feed">Go!</Link>
    </div>
  );
}