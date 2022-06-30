import React from 'react';
import Profile from './Profile.js';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
      <h1 className="header__title">Photo share App</h1>
      <Profile className="header__profile" />
      </div>
    </header>
  );
}
