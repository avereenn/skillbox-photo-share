import React from 'react';

export function Preloader() {
  return (
    <div className="preloader">
      <svg className="preloader__svg" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none">
        <circle className="preloader__circle" cx="100" cy="100" r="80" fill="none" strokeWidth="10" />
      </svg>
    </div>
  );
}

export function Error({ error }) {
  return <span className="error">Ошибка: {error}</span>;
}
