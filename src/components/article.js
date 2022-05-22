import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Image from './image.js';
import LikeButton from './likeBtn.js';
import constants from '../constants.js';

// function onTestLikeBtnClick() {
//   alert(`Like!`);
// }

function BackLink() {
  return <Link to={`/feed`}>НАЗАД</Link>;
}

export default function Article({ articleInfo, isSinglePage = false }) {

  if (isSinglePage) {
    const params = useParams();
    const articleId = params.articleId;
    const articles = useSelector(state => state.feed);
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
  const { bearerToken } = useSelector(state => state.auth);

  async function onToggleLikeBtnClick() {
    const { API_URL, POST_PARAMS: { client_id: clientId } } = constants.unsplashApi.POST_PARAMS;
    const method = liked_by_user ? `DELETE` : `POST`;
    if (confirm(`всё верно? ${clientId} ${bearerToken}`)) {
      const response = await fetch(`${API_URL}/photos/${id}/like`, {
        method,
        mode: `cors`,
        headers: {
          [`Authorization`]: `Bearer ${bearerToken}`,
        }
      });

      dispatch({ type: `feed/toggleLikePhoto`, response, payload: id });
    }

    alert(`не получилось поставить лайк`);
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
          {isSinglePage ? <LikeButton isLiked={liked_by_user} onBtnClick={onToggleLikeBtnClick} /> : null}
        </div>
      </div>
    </article>
  );
}
