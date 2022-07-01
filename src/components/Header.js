import React from 'react';
import { useLocation } from 'react-router-dom';
import Profile from './Profile.js';

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
      <h1 className="header__title">Photo share App</h1>
      {location.pathname !== `/` ? <Profile /> : null}
      </div>
    </header>
  );
}
