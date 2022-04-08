import React from 'react';
import { Link } from 'react-router-dom';

export default function Article({ articleInfo }) {
  const {
    id,
    created_at: dateStr,
    description,
    likes,
    user: { username },
    user: { links: { html } },
    urls: { thumb },
  } = articleInfo;
  const articleDateStr = new Date(dateStr).toLocaleString(`ru`);

  return (
    <article className="app__article article">
      <h2 hidden>{description}</h2>
      <Link to={`/${id}`}>
        <img className="article__image" src={thumb} alt={description} />
      </Link>
      <a className="article__author" href={html}>{username}</a>
      <time className="article__time" dateTime={dateStr}>{articleDateStr}</time>
      <span className="article__likes">{likes}</span>
    </article>
  );
}
