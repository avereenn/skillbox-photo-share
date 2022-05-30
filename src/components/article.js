import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleLike } from '../store/store.js';
import Image from './image.js';
import LikeButton from './likeBtn.js';

// компонент ссылки возврата в ленту
function BackLink() {
  return <Link to={`/`}>НАЗАД</Link>;
}

/* компонент поста с пропсом isSinglePage. Пропс отвечаем за условный рендеринг компонента
 * как поста и как отдельной страницы поста
 */
export default function Article({ articleInfo, isSinglePage = false }) {
  // если компонент является отдельной страницей поста получаем id поста из location, получаем этот пост
  const params = useParams();
  const articleId = params.articleId;
  const { feed: articles } = useSelector(state => state.feed);
  const dispatch = useDispatch();

  if (isSinglePage) {
    articleInfo = articles.find(article => article.id === articleId);
  }

  // получаем нужную информацию поста
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

  // обработчик кнопки лайка
  function onToggleLikeBtnClick() {
    dispatch(toggleLike(id));
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
