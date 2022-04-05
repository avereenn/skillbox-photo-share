import React from 'react';

export default function Article({
  imgSrc,
  imgDesc = `image from unsplash.com`,
  authorName,
  authorLink,
  date,
  likesAmount,
  onImgClick
}) {
const postDateTime = new Date(date).toLocaleString(`ru`);

  return (
  <article className="app__article article">
    <h2 hidden>{imgDesc}</h2>
    <img className="article__image" src={imgSrc} alt={imgDesc} onClick={onImgClick} />
    <a className="article__author" href={authorLink}>{authorName}</a>
    <time className="article__time" dateTime={date}>{postDateTime}</time>
    <span className="article__likes">{likesAmount}</span>
  </article>
  );
}
