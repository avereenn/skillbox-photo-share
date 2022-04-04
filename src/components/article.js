import React from 'react';

export default function Article({
  imgSrc,
  imgAlt,
  authorName,
  authorLink,
  date,
  likesAmount,
  onImgClick
}) {
const postDateTime = new Date(date).toLocaleString(`ru`);

  return (
  <article className="app__article article">
    <img className="article__image" src={imgSrc} alt={imgAlt} onclick={onImgClick} />
    <a className="article__author" href={authorLink}>{authorName}</a>
    <time className="article__time" dateTime={date}>{postDateTime}</time>
    <span className="article__likes">{likesAmount}</span>
  </article>
  );
}
