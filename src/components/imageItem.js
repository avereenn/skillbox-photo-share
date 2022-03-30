import React from 'react';

export default function ImageItem({ imgSrc, authorName, authorLink, date, likesAmount, onImgClick }) {
const postDateTime = new Date(date).toLocaleString(`ru`);

  return (
  <article className="app__image-post post">
    <img className="post__image" src={imgSrc} alt="image-from-unsplash" onclick={onImgClick} />
    <a className="post__author" href={authorLink}>{authorName}</a>
    <time className="post__time" dateTime={date}>{postDateTime}</time>
    <span className="post__likes">{likesAmount}</span>
  </article>
  );
}