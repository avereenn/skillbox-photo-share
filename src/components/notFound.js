import React from 'react';
import { Navigate } from 'react-router-dom';
import { Preloader } from './statusComponents.js';

// если путь не существует или некорретен компонент перенаправляет пользователя на главную страницу
export default function NotFound() {
  return (
    <React.Fragment>
      <Preloader />
      <Navigate to="/" />
    </React.Fragment>
  );
}
