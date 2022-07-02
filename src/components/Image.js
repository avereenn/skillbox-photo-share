import React from 'react';
import { Link } from 'react-router-dom';

export default function Image({ id, urls, alt, isLink = true }) {

  return isLink ?
    (
      <Link to={`/photos/${id}`}>
        <img className="article__image" src={urls.thumb} alt={alt} />
      </Link>
    ) :
    (
      <img className="article__image" src={urls.regular} alt={alt} />
    );
}
