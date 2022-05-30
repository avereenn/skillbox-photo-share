import React from 'react';

export function Preloader() {
  return <span className="app__preloader">Загрузка...</span>
}

export function Error({ error }) {
  return <span className="app__error">Ошибка: {error}</span>
}