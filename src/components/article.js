import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Image from './image.js';
import LikeButton from './likeBtn.js';

// function onTestLikeBtnClick() {
//   alert(`Like!`);
// }

function BackLink() {
  return <Link to={`/feed`}>НАЗАД</Link>;
}

export default function Article({ articleInfo, isSinglePage = false }) {
  if(isSinglePage) {
    const params = useParams();
    const articleId = params.articleId;
    const articles = useSelector(state => state.feed);
    const { isAuthorized, bearerToken } = useSelector(state => state.auth);
    articleInfo = articles.find(article => article.id === articleId);
  }

  const {
    id,
    created_at: dateStr,
    description,
    likes,
    liked_by_user,
    user: { username },
    user: { links: { html } },
    urls,
  } = articleInfo;
  const articleDateStr = new Date(dateStr).toLocaleString(`ru`);
  const dispatch = useDispatch();

  async function onToggleLikeBtnClick() {
    const method = liked_by_user ? `DELETE` : `POST`;
    const response = await fetch(`https://unsplash.com/photos/${id}/like`, {
      method,
      headers: {
        [`Authorized`]: bearerToken
      }
    });

    dispatch({ type: `feed/toggleLikePhoto`, response, payload: id });
  }

  return (
    <article className="app__article article">
      {isSinglePage ? <BackLink /> : null}
      <h2 hidden>{description}</h2>
      <Image id={id} urls={urls} description={description} isLink={!isSinglePage} />
      <div className="article__info">
        <time className="article__time" dateTime={dateStr}>{articleDateStr}</time>
        <a className="article__author" href={html}>{username}</a>
        <div className="article__like">
          <span className="article__likes">{likes}</span>
          {isSinglePage ? <LikeButton onBtnClick={onToggleLikeBtnClick} /> : null}
        </div>
      </div>
    </article>
  );
}