import React from 'react';
import { Link } from 'react-router-dom';

export default function Image({ id, urls, description, isLink = true }) {
  // условный рендеринг для изображения-ссылки (в ленте) и простого изображения
  return isLink ?
    (
      <Link to={`/${id}`}>
        <img className="article__image" src={urls.thumb} alt={description} />
      </Link>
    ) :
    (
      <img className="article__image" src={urls.regular} alt={description} />
    );
}