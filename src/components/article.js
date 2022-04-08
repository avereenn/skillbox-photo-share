import React from 'react';
import { Link } from 'react-router-dom';
import { getValidArticleInfo } from '../utils.js';

export default function Article({ articleInfo }) {
articleInfo = getValidArticleInfo(articleInfo);
const {
  id,
  created_at: dateStr,
  description,
  likes,
  user.username: userName,
  user.links.html: userLink,
  urls.thumb: src,
} = articleInfo;
const articleDateStr = new Date(dateStr).toLocaleString(`ru`);

  return (
  <article className="app__article article">
    <h2 hidden>{description}</h2>
    <Link to={`/${id}`}>
      <img className="article__image" src={src} alt={description} />
    </Link>
    <a className="article__author" href={userLink}>{userName}</a>
    <time className="article__time" dateTime={dateStr}>{articleDateStr}</time>
    <span className="article__likes">{likes}</span>
  </article>
  );
}