import React from 'react';
import unsplashApi from '../unsplash';

export default function Index() {
  const authUrl = unsplashApi.auth.getAutenticationUrl([
    `public`,
    `write_likes`
  ]);

  location.assign(authUrl);

  return (
    <div>Redirecting...</div>
  )
}
