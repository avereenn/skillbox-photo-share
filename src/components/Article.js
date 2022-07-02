import React, { forwardRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLike } from '../store/actions/feed.js';
import Image from './Image.js';
import TooltipLikeButton from './TooltipLikeBtn.js';
import { INITIAL_IMG_TEXT } from '../constants.js';

function BackLink() {
  const navigate = useNavigate();

  function onGoBackLinkClick(ev) {
    ev.preventDefault();

    navigate(-1);
  }
  return <a href="#" onClick={onGoBackLinkClick}>НАЗАД</a>;
}

const Article = forwardRef(({ articleInfo, isSinglePage = false }, ref) =>  {
  const params = useParams();
  const articleId = params.articleId;
  const { feed: articles } = useSelector(state => state.feed);
  const { isAuth } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  if (isSinglePage) {
    articleInfo = articles.find(article => article.id === articleId);
  }

  const {
    id,
    created_at: dateStr,
    description,
    alt_description,
    likes,
    liked_by_user,
    user: { username },
    user: { links: { html } },
    urls,
  } = articleInfo;
  const articleDateStr = new Date(dateStr).toLocaleString(`ru`);

  function onToggleLikeBtnClick() {
    dispatch(toggleLike(id));
  }

  return (
    <>
      {isSinglePage ? <BackLink /> : null}
      <article className={`feed__article ${isSinglePage ? `feed__article_single` : ``} article`} ref={ref}>
        <h2 hidden>{description || INITIAL_IMG_TEXT}</h2>
        <Image id={id} urls={urls} alt={alt_description || INITIAL_IMG_TEXT} isLink={!isSinglePage} />
        <div className="article__info">
          <time className="article__time" dateTime={dateStr}>{articleDateStr}</time>
          <a className="article__author" href={html}>{username}</a>
          <div className="article__like">
          <TooltipLikeButton isAuth={isAuth} isLiked={liked_by_user} onBtnClick={onToggleLikeBtnClick} />
            <span className="article__likes">
              {likes}
            </span>
          </div>
        </div>
      </article>
    </>
  );
});

export default Article;
