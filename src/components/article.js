import React from 'react';
import { INITIAL_IMG_DESC } from '../constants.js';

export default function Article({
  imgSrc,
  imgDesc,
  authorName,
  authorLink,
  date,
  likesAmount,
  onImgClick
}) {
const postDateTime = new Date(date).toLocaleString(`ru`);

// проверяем наличие описания изображения
if(imgDesc !== null && typeof imgDesc !== `undefined`) {
  imgDesc = imgDesc.trim();
}

// описания нет - заменяем строкой по умолчанию
if(!imgDesc) imgDesc = INITIAL_IMG_DESC;

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