import React from 'react';
import { Navigate } from 'react-router-dom';
import { Preloader } from './statusComponents.js';

export default function NotFound() {
  return (
    <React.Fragment>
      <Preloader />
      <Navigate to="/" />
    </React.Fragment>
  );
}
