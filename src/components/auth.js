import React from 'react';
import { useParams } from 'react-router-dom';
import unsplashApi from '../unsplash';

export default function Auth() {
  const params = useParams();
  const authCode = params.code;

  if(!!code) {
    unsplashApi.auth.userAutentication(authCode)
      .then(res => res.json())
      .then(json => {
        unsplashApi.auth.setBearerToken(json.access_token);
      });
  }

  return (
    <div>Autentication...</div>
  );
}
