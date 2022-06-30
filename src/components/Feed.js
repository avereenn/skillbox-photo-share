import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { incPagesNumber } from '../store/actions/feed.js';
import { Preloader, Error } from './statusComponents.js';
import Article from './Article.js';
import { ONSCROLL_LOAD_DELAY } from '../constants.js';

export default function Feed({ articles, status, error }) {
  const feedRef = useRef(null);
  const dispatch = useDispatch();
  const articleItems = articles.map(article => {
    return (<li key={article.id} id={article.id} className="feed__item">
      <Article articleInfo={article} />
    </li>);
  });

  let isDelay = false;

  function onPushPhotosWindowScroll() {
    if (isDelay) return;

    const elemBottomPosition = Math.ceil(feedRef.current.getBoundingClientRect().bottom);
    const windowHeight = document.documentElement.clientHeight;

    if (elemBottomPosition <= windowHeight) {
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
