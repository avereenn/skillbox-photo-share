import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { incPagesNumber } from '../store/store.js';
import { Preloader, Error } from './statusComponents.js';
import Article from './article.js';
import constants from '../constants.js';

export default function Feed({ articles, status, error }) {
  const { ONSCROLL_LOAD_DELAY } = constants;
  const feedRef = useRef(null);
  const dispatch = useDispatch();
  const articleItems = articles.map(article => {
    return (<li key={article.id} id={article.id} className="feed__item">
      <Article articleInfo={article} />
    </li>);
  });

  // состояние задержки между событиями скролла для загрузки фото
  let isDelay = false;

  // обработчик события scroll для добавления элементов в ленту
  function onPushPhotosWindowScroll() {
    if (isDelay) return;

    const elemBottomPosition = Math.ceil(feedRef.current.getBoundingClientRect().bottom);
    const windowHeight = document.documentElement.clientHeight;

    if (elemBottomPosition <= windowHeight) {
      // устанавливаем состояние задержки и отключаем её через время задержки
      isDelay = true;
      setTimeout(() => isDelay = false, ONSCROLL_LOAD_DELAY);
      dispatch(incPagesNumber());
    }
  }

  useEffect(() => {
    window.addEventListener(`scroll`, onPushPhotosWindowScroll);
    return () => {
      window.removeEventListener(`scroll`, onPushPhotosWindowScroll);
    }
  }, []);

  return (
    <>
      <ul className="feed" ref={feedRef}>{articleItems}</ul>
      {status === `loading` && <Preloader />}
      {error && <Error error={error} />}
    </>
  );
}
